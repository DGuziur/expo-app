import Spinner from "@/components/Spinner";
import app from "@/firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";

export default function TabsLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading)
    return (
      <Spinner
        style={{ flex: 1 }}
        size={100}
        color="pink"
        strokeWidth={8}
      ></Spinner>
    );

  if (!user) return <Redirect href={"/(auth)/LoginPage"} />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Modules",
          tabBarIcon({ color, size }) {
            return (
              <Ionicons
                name="book-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Lessons"
        options={{
          title: "Dla testów",
          tabBarIcon({ color, size }) {
            return (
              <Ionicons
                name="thumbs-down-outline"
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
