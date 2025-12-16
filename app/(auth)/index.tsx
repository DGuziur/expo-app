import GowiButton from "@/components/GowiButton";
import GowiSafeArea from "@/components/GowiSafeArea";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import GowiAppIcon from "@assets/icons/GowiIcon.svg";
import { router } from "expo-router";
import { Dimensions, Text, View } from "react-native";

export default function WelcomePage() {
  const theme = useTheme();
  return (
    <GowiSafeArea>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GowiAppIcon width={148} height={148}></GowiAppIcon>
        <Text
          style={{
            ...theme.fonts.primary.bold,
            color: themeColors.textDarkMode.textPrimary,
            fontSize: 34,
          }}
        >
          MyGowi
        </Text>
      </View>

      <View
        style={{
          gap: 16,
          width: Math.min(Dimensions.get("screen").width - 80),
        }}
      >
        <GowiButton
          type="secondary"
          title={"Mam już konto"}
          onPress={() => router.navigate("/(auth)/LoginPage")}
        ></GowiButton>
        <GowiButton
          type="primary"
          title={"Zaczynamy"}
          onPress={() =>
            router.navigate("/(introduction)/GowiFirstIntroduction")
          }
        ></GowiButton>
      </View>
    </GowiSafeArea>
  );
}
