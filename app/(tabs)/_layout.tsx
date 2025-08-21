import Spinner from "@/components/Spinner";
import { auth } from "@/firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged, signOut, User } from "@firebase/auth";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
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
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => signOut(auth)}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ marginRight: 10 }}>
                {auth.currentUser?.displayName ??
                  auth.currentUser?.email ??
                  "User"}
              </Text>
              <Image
                source={{ uri: "https://i.pravatar.cc/40" }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 50,
                }}
              ></Image>
            </View>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "powderblue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        tabBarStyle: {
          backgroundColor: "powderblue",
        },
      }}
    >
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
