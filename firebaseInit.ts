import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { Platform } from "react-native";

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: getRequiredEnvVar("EXPO_PUBLIC_API_KEY"),
  authDomain: getRequiredEnvVar("EXPO_PUBLIC_AUTH_DOMAIN"),
  projectId: getRequiredEnvVar("EXPO_PUBLIC_PROJECT_ID"),
  storageBucket: getRequiredEnvVar("EXPO_PUBLIC_STORAGE_BUCKET"),
  messagingSenderId: getRequiredEnvVar("EXPO_PUBLIC_MESSAGING_SENDER_ID"),
  appId: getRequiredEnvVar("EXPO_PUBLIC_ID"),
  measurementId: getRequiredEnvVar("EXPO_PUBLIC_MEASUREMENT_ID"),
};

const app = initializeApp(firebaseConfig);
if (Platform.OS === "web") {
  //   initializeAnalytics(app);
}
initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export default app;
