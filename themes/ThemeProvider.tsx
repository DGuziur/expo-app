import { useFonts } from "expo-font";
import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./index";

const ThemeContext = createContext(lightTheme);
type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-SemiBold": require("@assets/fonts/SpaceGrotesk-SemiBold.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf"),
    "Lato-Black": require("@assets/fonts/Lato-Black.ttf"),
    "Lato-BlackItalic": require("@assets/fonts/Lato-BlackItalic.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("@assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-Italic": require("@assets/fonts/Lato-Italic.ttf"),
    "Lato-Light": require("@assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("@assets/fonts/Lato-LightItalic.ttf"),
    "Lato-Thin": require("@assets/fonts/Lato-Thin.ttf"),
    "Lato-ThinItalic": require("@assets/fonts/Lato-ThinItalic.ttf"),
  });

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  if (fontsLoaded)
    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
