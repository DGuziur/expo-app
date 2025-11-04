// src/theme/ThemeProvider.tsx
import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./index";

const ThemeContext = createContext(lightTheme);
type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
