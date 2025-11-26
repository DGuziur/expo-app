import { useAuth } from "@/AuthContext";
import Spinner from "@/components/Spinner";
import { useTheme } from "@/themes/ThemeProvider";
import { Redirect } from "expo-router";
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

  if (true)
    return (
      <Redirect href="/(introduction)/IntoductionInitialQuestions"></Redirect>
    );

  // if (user) return <Redirect href="/(tabs)/(modules)" />;

  // return <Stack screenOptions={{ headerShown: false }} />;
}
