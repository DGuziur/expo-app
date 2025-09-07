import { onAuthStateChanged, User } from "@firebase/auth";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "./firebaseInit";

type AuthContextType = {
  user: User | null;
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) router.replace("/(tabs)/(modules)");
      else router.replace("/(auth)/LoginPage");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
