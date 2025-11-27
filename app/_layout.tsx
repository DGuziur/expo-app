import AuthProvider from "@/AuthContext";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Slot } from "expo-router";
import "./../i18n.config";

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
