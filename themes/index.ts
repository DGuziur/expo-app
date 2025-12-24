import { TextStyle } from "react-native";
import { themeColors } from "./themeColors";

const primaryFonts = {
  light: { fontFamily: "SpaceGrotesk-Light" } as TextStyle,
  regular: { fontFamily: "SpaceGrotesk-Regular" } as TextStyle,
  medium: { fontFamily: "SpaceGrotesk-Medium" } as TextStyle,
  semiBold: { fontFamily: "SpaceGrotesk-SemiBold" } as TextStyle,
  bold: { fontFamily: "SpaceGrotesk-Bold" } as TextStyle,
};

const latoFonts = {
  thin: { fontFamily: "Lato-Thin" } as TextStyle,
  thinItalic: { fontFamily: "Lato-ThinItalic" } as TextStyle,
  light: { fontFamily: "Lato-Light" } as TextStyle,
  lightItalic: { fontFamily: "Lato-LightItalic" } as TextStyle,
  regular: { fontFamily: "Lato-Regular" } as TextStyle,
  italic: { fontFamily: "Lato-Italic" } as TextStyle,
  bold: { fontFamily: "Lato-Bold" } as TextStyle,
  boldItalic: { fontFamily: "Lato-BoldItalic" } as TextStyle,
  black: { fontFamily: "Lato-Black" } as TextStyle,
  blackItalic: { fontFamily: "Lato-BlackItalic" } as TextStyle,
};

export const lightTheme = {
  mode: "light",
  background: themeColors.neutralsLightMode.background,
  gradientBackground: [themeColors.neutralsLightMode.background, "#000"],
  surface: themeColors.neutralsLightMode.surface,
  textPrimary: themeColors.textLightMode.textPrimary,
  textSecondary: themeColors.textLightMode.textSecondary,
  fonts: {
    primary: primaryFonts,
    lato: latoFonts,
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
    primary: primaryFonts,
    lato: latoFonts,
  },
  ...themeColors,
};
