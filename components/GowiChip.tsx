import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { ReactNode, useState } from "react";
import { ColorValue, Pressable, Text, View } from "react-native";

interface ChipVariant {
  primaryColor: ColorValue;
  shadowColor: ColorValue;
  textColor: ColorValue;
  activeColor: ColorValue;
  activeTextColor: ColorValue;
  disabledPrimary: ColorValue;
  disabledText: ColorValue;
  disabledShadow: ColorValue;
}

const ChipVariants = {
  primary: {
    primaryColor: themeColors.primary[900],
    shadowColor: "#EB6900",
    textColor: themeColors.textDarkMode.textPrimary,
    activeColor: themeColors.primary[100],
    activeTextColor: themeColors.textDarkMode.textInverted,
    disabledPrimary: "#C2AB98",
    disabledText: themeColors.greys[820],
    disabledShadow: themeColors.greys[660],
  },
  secondary: {
    primaryColor: themeColors.secondary[900],
    shadowColor: "#6A2AAB",
    textColor: themeColors.textDarkMode.textPrimary,
    activeColor: themeColors.secondary[200],
    activeTextColor: themeColors.textDarkMode.textInverted,
    disabledPrimary: "#A89EB2",
    disabledText: themeColors.greys[820],
    disabledShadow: themeColors.greys[660],
  },
  accent: {
    primaryColor: themeColors.accent[900],
    shadowColor: "#E5007A",
    textColor: themeColors.textDarkMode.textPrimary,
    activeColor: themeColors.accent[100],
    activeTextColor: themeColors.textDarkMode.textInverted,
    disabledPrimary: "#BF98AB",
    disabledText: themeColors.greys[820],
    disabledShadow: themeColors.greys[660],
  },
} satisfies Record<string, ChipVariant>;

interface GowiChipProps {
  children: ReactNode | string;
  variant: keyof typeof ChipVariants | ChipVariant;
  onPress?: Function;
  disabled?: boolean;
}

export default function GowiChip({
  variant,
  children,
  onPress,
  disabled = false,
}: GowiChipProps) {
  const [active, setActive] = useState(false);
  const colorVariant: ChipVariant =
    typeof variant === "string" ? ChipVariants[variant] : variant;
  const theme = useTheme();
  return (
    <View
      style={{
        height: 33,
        position: "relative",
        width: "auto",
      }}
    >
      <Pressable
        onPress={() => {
          if (disabled) return;
          setActive(!active);
          if (onPress) onPress();
        }}
        style={{
          flex: 1,
          backgroundColor: disabled
            ? colorVariant.disabledPrimary
            : active
            ? colorVariant.activeColor
            : colorVariant.primaryColor,

          zIndex: 1,
          borderRadius: 15,
          justifyContent: "center",
          alignContent: "center",
          transform: [{ translateY: active && !disabled ? 4 : 0 }],
        }}
      >
        <Text
          style={{
            ...theme.fonts.lato.boldItalic,
            paddingHorizontal: 12,
            color: disabled
              ? colorVariant.disabledText
              : active
              ? colorVariant.activeTextColor
              : colorVariant.textColor,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          {children}
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 4,
          bottom: -6,
          left: 0,
          right: 0,
          backgroundColor: disabled
            ? colorVariant.disabledShadow
            : colorVariant.shadowColor,
          borderRadius: 15,
        }}
      ></View>
    </View>
  );
}
