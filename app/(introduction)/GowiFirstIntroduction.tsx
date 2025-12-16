import StepperPanel, { StepData } from "@/components/stepper/StepperPanel";
import OnboBackground from "@assets/icons/ONBO BACKGROUND.png";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

const stepperPanelTestData: StepData[] = [
  {
    title: "introductionTexts.Hi, im gowi",
    description:
      "introductionTexts.Nice to see you! I can help you understand yourself This will only take a moment",
    nextButtonText: "buttons.Hi Gowi",
  },
  {
    title: "introductionTexts.Your daily space for self-discovery.",
    description:
      "introductionTexts.I help you strengthen your inner power, better understand yourself, and discover ways of living that truly suit you.",
    nextButtonText: "buttons.Sounds good",
  },
  {
    title: "introductionTexts.Step by step, at your pace.",
    description:
      "introductionTexts.Every moment you dedicate to yourself matters. Thanks to this, you get closer and closer to what you truly desire.",
    nextButtonText: "buttons.Let's start",
    hideBackButton: true,
  },
];

export default function GowiFirstIntroduction() {
  return (
    <View style={styles.container}>
      <View style={styles.dotContainer}>
        <View style={[styles.dot, { width: 200, height: 200 }]} />
      </View>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={OnboBackground}
        resizeMode={"stretch"}
      ></Image>
      <StepperPanel
        steps={stepperPanelTestData}
        afterFinalStep={() => {
          router.replace("/(introduction)/InitialQuestionsTimeEstimation");
        }}
      ></StepperPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  dotContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#FFD600",
    borderRadius: 9999,
    zIndex: 100,
  },
});
