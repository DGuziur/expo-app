import { buttonsStyles } from "@/assets/styles/buttons";
import { themeColors } from "@/themes/themeColors";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, ViewStyle } from "react-native";

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
   // colors: ["#FFE044", "#FF8C42", "#CA009E"],
    colors: themeColors.gradientsDarkMOde.cta,
    pressedColors: ["#FFA64A"],
    borderColor: "#B34602",
    textColor: "#FFFFFF",
    hasShadow: true,
  },
  secondary: {
    colors: [themeColors.secondary[700]],
    pressedColors: [themeColors.secondary[300]],
    borderColor: "#6A2AAB",
    textColor: "#FFFFFF",
    hasShadow: false,
  },
  disabled: {
    colors: ["#666666"],
    pressedColors: ["#404040"],
    borderColor: "#8A8A8A",
    textColor: "#B3B3B3",
    hasShadow: false,
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
        ? {
            width: 56,
            height: 56,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          } as ViewStyle
        : {
            width: 40,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          } as ViewStyle
      : size === "L"
      ? buttonsStyles.base_L
      : buttonsStyles.base_S;

  if (textOnly) {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <LinearGradient
            colors={pressed ? ["rgba(255, 255, 255, 0.25)"] : ["transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              sizeStyle,
              {
                borderBottomColor: "transparent",
                borderBottomWidth: 0,
              },
            ]}
          >
            <Text
              style={[
                buttonsStyles.text,
                { color: type === "disabled" ? "#666666" : "#FFFFFF" },
                { textDecorationLine: underline ? "underline" : "none" },
              ]}
            >
              {title} &#8594;
            </Text>
          </LinearGradient>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} > 
      {({ pressed }) => (
        <LinearGradient
          colors={pressed ? config.pressedColors : config.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            sizeStyle,
            config.hasShadow && buttonsStyles.shadow,
            {
              borderBottomColor: config.borderColor,
              borderBottomWidth: square ? 5 : 3,
            },
          ]}
        >
          <Text
            style={[
              buttonsStyles.text,
              { color: config.textColor },
              { textDecorationLine: underline ? "underline" : "none" },
            ]}
          >
            {title} &#8594;
          </Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}