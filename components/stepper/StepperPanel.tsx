import { useTheme } from "@/themes/ThemeProvider";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import GowiButton from "../GowiButton";
import Stepper from "./Stepper";

export interface StepperPanelProps {
  steps: StepData[];
  afterFinalStep: Function;
}

export interface StepData {
  title: string;
  description: string;
  hideBackButton?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
}

export default function StepperPanel({
  steps,
  afterFinalStep,
}: StepperPanelProps) {
  const [step, setStep] = useState(1);
  const stepData = steps[step - 1];
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ ...style.intro, paddingBottom: insets.bottom }}>
      <View
        style={{
          flex: 1,
          gap: 30,
          marginBottom: 30,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            color: theme.textDarkMode.textPrimary,
            fontSize: 28,
            textAlign: "center",
          }}
        >
          {t(stepData.title)}
        </Text>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            color: theme.textDarkMode.textSecondary,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {t(stepData.description)}
        </Text>
        <View>
          <Stepper currentStep={step} totalSteps={steps.length}></Stepper>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: 40,
          gap: 8,
        }}
      >
        {!stepData.hideBackButton && (
          <View style={{ flex: 1 }}>
            <GowiButton
              type="secondary"
              title={t(stepData.backButtonText ?? "buttons.Skip")}
              onPress={() => {
                router.push("/(auth)/LoginPage");
              }}
            ></GowiButton>
          </View>
        )}
        <View style={{ flex: 2 }}>
          <GowiButton
            type="primary"
            title={t(stepData.nextButtonText ?? "Hi gowi")}
            onPress={() => {
              if (step >= steps.length) return afterFinalStep();
              setStep((state) => (state < steps.length ? state + 1 : 1));
            }}
          ></GowiButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  intro: {
    flex: 1,
    backgroundColor: "#260d30",
  },
});
