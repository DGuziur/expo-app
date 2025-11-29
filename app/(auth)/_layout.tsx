import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { useTheme } from "@/themes/ThemeProvider";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthRoutesLayout() {
  const { user, loading } = useAuth();
  const theme = useTheme();
  if (loading)
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Spinner
          style={{ flex: 1 }}
          size={100}
          color="pink"
          strokeWidth={8}
        ></Spinner>
      </View>
    );

  if (!user) return <Stack screenOptions={{ headerShown: false }} />;

  if (!user.hasCompletedOnboarding)
    return (
      <Redirect href="/(introduction)/IntoductionInitialQuestions"></Redirect>
    );

  return <Redirect href="/(tabs)/(modules)" />;
}
