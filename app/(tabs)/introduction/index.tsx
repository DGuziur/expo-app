import GowiButton from "@/components/GowiButton";
import Stepper from "@/components/Stepper";
import { useTheme } from "@/themes/ThemeProvider";
import OnboBackground from "@assets/icons/ONBO BACKGROUND.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Introduction() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [onboardingStep, setIntroductionStep] = useState(1);
  return (
    <View style={style.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={OnboBackground}
        resizeMode={"stretch"}
      ></Image>
      <View style={style.intro}>
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            color: theme.textDarkMode.textPrimary,
            fontSize: 28,
          }}
        >
          {t("introductionTexts.Hi, im gowi")}
        </Text>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            color: theme.textDarkMode.textSecondary,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {t("introductionTexts.Nice to see you")}
          {t("introductionTexts.I can help you understand yourself")}
          {t("introductionTexts.This will only take a moment")}
        </Text>
        <Stepper currentStep={onboardingStep} totalSteps={3}></Stepper>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <GowiButton type="secondary" title={t("Skip")}></GowiButton>
          <GowiButton
            type="primary"
            title={t("Hi Gowi")}
            onPress={() =>
              setIntroductionStep((state) => (state < 3 ? state + 1 : 1))
            }
          ></GowiButton>
        </View>
      </View>
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
  intro: {
    flex: 1,
    backgroundColor: "#260d30",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
