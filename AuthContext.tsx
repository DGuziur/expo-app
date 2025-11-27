import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
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
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
            hasCompletedOnboarding: false,
          });
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
