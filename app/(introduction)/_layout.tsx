import { themeColors } from "@/themes/themeColors";
import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";

export default function IntoductionInitialQuestions() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={themeColors.gradientsDarkMOde.background}
    >
      <Slot></Slot>
    </LinearGradient>
  );
}
