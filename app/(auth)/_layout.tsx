import Spinner from "@/components/Spinner";
import { auth } from "@/firebaseInit";
import { onAuthStateChanged, User } from "@firebase/auth";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthRoutesLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading)
    return <Spinner size={60} color="#FF6B6B" strokeWidth={6}></Spinner>;

  if (user) return <Redirect href={"/"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
