import AuthProvider from "@/AuthContext";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <>
     <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
     </ThemeProvider>
    </>
  );
}
