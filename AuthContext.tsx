import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { app, auth } from "./firebaseInit";

type AuthContextType = {
  user: DocumentData | null;
  authUser: User | null;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  authUser: null,
  loading: true,
});

const db = getFirestore(app);
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFromDoc: Unsubscribe | null = null;

    const unsubscribeFromAuth = onAuthStateChanged(auth, async (authUser) => {
      if (unsubscribeFromDoc) {
        unsubscribeFromDoc();
        unsubscribeFromDoc = null;
      }

      if (authUser) {
        const userRef = doc(db, "Users", authUser.uid);
        setAuthUser(authUser);

        unsubscribeFromDoc = onSnapshot(
          userRef,
          async (docSnapshot) => {
            console.log("USER SNAPSHOT TRIGGERED");
            if (docSnapshot.exists()) {
              setUser(docSnapshot.data());
            } else {
              await setDoc(userRef, {
                uid: authUser.uid,
                email: authUser.email,
                displayName: authUser.displayName,
                photoURL: authUser.photoURL,
                createdAt: serverTimestamp(),
                hasCompletedOnboarding: false,
              });
            }
            setLoading(false);
          },
          (error) => {
            setUser(null);
            setAuthUser(null);
            setLoading(false);
          }
        );
      } else {
        setUser(null);
        setAuthUser(null);
        setLoading(false);
      }
      console.log("AUTHCONTEXT TRIGGERED");
    });

    return () => {
      unsubscribeFromAuth();
      if (unsubscribeFromDoc) {
        unsubscribeFromDoc();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, authUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
