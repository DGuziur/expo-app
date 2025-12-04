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
  });

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  if (fontsLoaded)
    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
