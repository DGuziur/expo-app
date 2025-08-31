import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  return (
    <>
      <ToastProvider>
        <Slot />;
      </ToastProvider>
    </>
  );
}
