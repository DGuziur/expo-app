import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Slot } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AuthRoutesLayout() {
  const { user, loading: authLoading } = useAuth();
  const { ready: i18nReady } = useTranslation();

  const isLoading = authLoading || !i18nReady;

  const theme = useTheme();
  if (isLoading)
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
        <Slot
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

  if (!user.displayName)
    return <Redirect href="/(introduction)/PickYourUsername"></Redirect>;

  if (!user.hasCompletedOnboarding)
    return (
      <Redirect href="/(introduction)/InitialQuestionsTimeEstimation"></Redirect>
    );

  return <Redirect href="/(tabs)/(modules)" />;
}
