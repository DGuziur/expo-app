import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function SpeechBox() {
  useEffect(() => {
    router.navigate("/(introduction)/ChartStatsExplainPage");
  }, []);
  return <View></View>;
}
