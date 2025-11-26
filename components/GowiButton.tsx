import { buttonsStyles } from "@/assets/styles/buttons";
import { themeColors } from "@/themes/themeColors";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, Pressable, Text, View, ViewStyle } from "react-native";

type GowiButtonProps = {
  title: string;
  onPress?: () => void;
  size?: "L" | "S";
  type?: "primary" | "secondary" | "disabled";
  textOnly?: boolean;
  underline?: boolean;
  square?: boolean;
};

const variants = {
  primary: {
    colors: themeColors.gradientsDarkMOde.cta as [
      ColorValue,
      ColorValue,
      ColorValue
    ],
    pressedColors: ["#FFA64A", "#FFA64A"] as [ColorValue, ColorValue],
    borderColor: "#B34602",
    textColor: "#FFFFFF",
  },
  secondary: {
    colors: [themeColors.secondary[700], themeColors.secondary[700]] as [
      ColorValue,
      ColorValue
    ],
    pressedColors: [themeColors.secondary[300], themeColors.secondary[300]] as [
      ColorValue,
      ColorValue
    ],
    borderColor: "#6A2AAB",
    textColor: "#FFFFFF",
  },
  disabled: {
    colors: ["#666666", "#666666"] as [ColorValue, ColorValue],
    pressedColors: ["#404040", "#404040"] as [ColorValue, ColorValue],
    borderColor: "#8A8A8A",
    textColor: "#B3B3B3",
  },
};

export default function GowiButton({
  title,
  onPress,
  size = "L",
  type = "primary",
  textOnly = false,
  underline = false,
  square = false,
}: GowiButtonProps) {
  const config = variants[type];

  const sizeStyle = square
    ? size === "L"
      ? ({
          width: 56,
          height: 56,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        } as ViewStyle)
      : ({
          width: 40,
          height: 40,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        } as ViewStyle)
    : size === "L"
    ? buttonsStyles.base_L
    : buttonsStyles.base_S;

  if (textOnly) {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <LinearGradient
            colors={
              pressed
                ? ["rgba(255,255,255,0.25)", "rgba(255,255,255,0.25)"]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[sizeStyle]}
          >
            <Text
              style={{
                ...buttonsStyles.text,
                color: type === "disabled" ? "#666" : "#fff",
                textDecorationLine: underline ? "underline" : "none",
              }}
            >
              {title} &#8594;
            </Text>
          </LinearGradient>
        )}
      </Pressable>
    );
  }

  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          ...sizeStyle,
          position: "absolute",
          top: 4,
          left: 0,
          right: 0,
          backgroundColor: config.borderColor,
          borderRadius: sizeStyle.borderRadius,
        }}
      />

      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <LinearGradient
            colors={pressed ? config.pressedColors : config.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              ...sizeStyle,
              borderRadius: sizeStyle.borderRadius,
              transform: [{ translateY: pressed ? 4 : 0 }],
            }}
          >
            <Text
              style={{
                ...buttonsStyles.text,
                color: config.textColor,
                textDecorationLine: underline ? "underline" : "none",
              }}
            >
              {title} &#8594;
            </Text>
          </LinearGradient>
        )}
      </Pressable>
    </View>
  );
}
