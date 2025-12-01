import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { useTheme } from "@/themes/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function AuthRoutesLayout() {
  const { user, loading } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    AsyncStorage.getItem("globalSettings").then(
      (globalSettings: string | null) => {
        if (!globalSettings)
          return router.replace("/(introduction)/GowiFirstIntroduction");
        const settings = JSON.parse(globalSettings);
        if (!user && !settings.greetedGowi) {
          router.replace("/(introduction)/GowiFirstIntroduction");
        }
      }
    );
  }, []);

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
