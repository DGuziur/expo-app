import StepperPanel, { StepData } from "@/components/StepperPanel";
import { themeColors } from "@/themes/themeColors";
import OnboBackground from "@assets/icons/ONBO BACKGROUND.png";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";

const stepperPanelTestData: StepData[] = [
  {
    title: "Hi, im gowi",
    description: "Onboarding first",
    nextButtonText: "Hi Gowi",
  },
  {
    title: "Your everyday space",
    description: "Onboarding second",
    nextButtonText: "Sounds good",
  },
  {
    title: "Step by step, in your time",
    description: "Onboarding third",
    nextButtonText: "Begin",
    hideBackButton: true,
  },
];

export default function Introduction() {
  return (
    <LinearGradient
      colors={[
        themeColors.gradientsDarkMOde.background[1],
        themeColors.gradientsDarkMOde.background[1],
        themeColors.gradientsDarkMOde.background[0],
      ]}
      locations={[0, 0.1, 0.2]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={[styles.dot, { width: 12, height: 12 }]} />;
      <Image
        style={{ width: "100%", height: "50%" }}
        source={OnboBackground}
        resizeMode={"stretch"}
      ></Image>
      <StepperPanel steps={stepperPanelTestData}></StepperPanel>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  dot: {
    backgroundColor: "#FFD600",
    borderRadius: 9999,
  },
});
