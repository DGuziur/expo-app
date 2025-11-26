import StepperPanel, { StepData } from "@/components/StepperPanel";
import OnboBackground from "@assets/icons/ONBO BACKGROUND.png";
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
    <View style={style.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={OnboBackground}
        resizeMode={"stretch"}
      ></Image>
      <StepperPanel steps={stepperPanelTestData}></StepperPanel>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#300A33",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
});
