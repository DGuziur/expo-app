import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AuthRoutesLayout() {
  const { user, loading } = useAuth();
  const { ready } = useTranslation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading && ready) {
      setShowLoader(false);
    }
  }, [ready, loading]);

  const theme = useTheme();
  if (showLoader)
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
