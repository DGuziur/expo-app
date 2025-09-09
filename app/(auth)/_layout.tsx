import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
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

  if (user) return <Redirect href="/(tabs)/(modules)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
