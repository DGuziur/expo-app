import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { user, loading } = useAuth();
  const theme = useTheme();
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

  if (user) return <Redirect href="/(tabs)/(modules)" />;

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
      ;
    </LinearGradient>
  );
}
