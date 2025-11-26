import { TextStyle } from "react-native";
import { themeColors } from "./themeColors";

export const lightTheme = {
  mode: "light",
  background: themeColors.neutralsLightMode.background,
  gradientBackground: [themeColors.neutralsLightMode.background, "#000"],
  surface: themeColors.neutralsLightMode.surface,
  textPrimary: themeColors.textLightMode.textPrimary,
  textSecondary: themeColors.textLightMode.textSecondary,
  fonts: {
    primary: {
      loght: {
        fontFamily: "SpaceGrotesk-Light",
      } as TextStyle,
      regular: {
        fontFamily: "SpaceGrotesk-Regular",
      } as TextStyle,
      medium: {
        fontFamily: "SpaceGrotesk-Medium",
      } as TextStyle,
      semiBold: {
        fontFamily: "SpaceGrotesk-SemiBold",
      } as TextStyle,
      bold: {
        fontFamily: "SpaceGrotesk-Bold",
      } as TextStyle,
    },
  },
  ...themeColors,
};

export const darkTheme = {
  mode: "dark",
  background: themeColors.neutralsDarkMode.background,
  gradientBackground: themeColors.gradientsDarkMOde.background,
  surface: themeColors.neutralsDarkMode.surface,
  textPrimary: themeColors.textDarkMode.textPrimary,
  textSecondary: themeColors.textDarkMode.textSecondary,
  fonts: {
    primary: {
      loght: {
        fontFamily: "SpaceGrotesk-Light",
      } as TextStyle,
      regular: {
        fontFamily: "SpaceGrotesk-Regular",
      } as TextStyle,
      medium: {
        fontFamily: "SpaceGrotesk-Medium",
      } as TextStyle,
      semiBold: {
        fontFamily: "SpaceGrotesk-SemiBold",
      } as TextStyle,
      bold: {
        fontFamily: "SpaceGrotesk-Bold",
      } as TextStyle,
    },
  },
  ...themeColors,
};
