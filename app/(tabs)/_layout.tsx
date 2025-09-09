import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { auth } from "@/firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "@firebase/auth";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Spinner
        style={{ flex: 1 }}
        size={100}
        color="pink"
        strokeWidth={8}
      ></Spinner>
    );

  if (!user) return <Redirect href="/(auth)/LoginPage" />;

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
        name="(modules)"
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
          title: "lekcje",
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
      <Tabs.Screen
        name="AddLesson"
        options={{
          title: "Dla testów",
          tabBarIcon({ color, size }) {
            return (
              <Ionicons
                name="thumbs-up-outline"
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
