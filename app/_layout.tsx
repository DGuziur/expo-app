import AuthProvider from "@/AuthContext";
import { Slot } from "expo-router";
import "./../i18n.config";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </>
  );
}
