import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router, Stack } from "expo-router";
import { useEffect } from "react";

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
      <LinearGradient
        colors={[
          themeColors.gradientsDarkMOde.background[1],
          themeColors.gradientsDarkMOde.background[1],
          themeColors.gradientsDarkMOde.background[0],
        ]}
        locations={[0, 0.1, 0.2]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Spinner
          style={{ flex: 1 }}
          size={100}
          color={theme.textDarkMode.textPrimary}
          strokeWidth={8}
        ></Spinner>
      </LinearGradient>
    );

  if (!user)
    return (
      <LinearGradient
        colors={[
          themeColors.gradientsDarkMOde.background[1],
          themeColors.gradientsDarkMOde.background[1],
          themeColors.gradientsDarkMOde.background[0],
        ]}
        locations={[0, 0.1, 0.2]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
            animation: "none",
          }}
        />
      </LinearGradient>
    );

  if (!user.hasCompletedOnboarding)
    return (
      <Redirect href="/(introduction)/IntoductionInitialQuestions"></Redirect>
    );

  return <Redirect href="/(tabs)/(modules)" />;
}
