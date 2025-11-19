import { themeColors } from "./themeColors";

export const lightTheme = {
  mode: "light",
  background: themeColors.neutralsLightMode.background,
  surface: themeColors.neutralsLightMode.surface,
  textPrimary: themeColors.textLightMode.textPrimary,
  textSecondary: themeColors.textLightMode.textSecondary,
  ...themeColors, 
};

export const darkTheme = {
  mode: "dark",
  background: themeColors.neutralsDarkMode.background,
  surface: themeColors.neutralsDarkMode.surface,
  textPrimary: themeColors.textDarkMode.textPrimary,
  textSecondary: themeColors.textDarkMode.textSecondary,
  ...themeColors,
};