import GowiButton from "@/components/GowiButton";
import { IntroQuestions } from "@/data/newUserQuestions";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import BackButtonSVG from "@assets/icons/BackArrow.svg";
import Gowi from "@assets/images/gowiButterfly.png";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InitialQuestionsTimeEstimation() {
  const { t } = useTranslation();
  const theme = useTheme();
  const numberOfQuestions = IntroQuestions.length + 1;
  const numberOfMinutes = Math.ceil((numberOfQuestions * 6) / 60);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", padding: 30 }}
    >
      <View
        style={{
          marginBottom: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GowiButton
          square
          type="secondary"
          size="S"
          onPress={() => router.back()}
          title={<BackButtonSVG></BackButtonSVG>}
        ></GowiButton>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...theme.fonts.primary.bold,
              color: themeColors.textDarkMode.textPrimary,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {t("quizTexts.Great that you are here")}
          </Text>
        </View>
      </View>
      <Image style={{ alignSelf: "center" }} source={Gowi}></Image>
      <View style={{ gap: 5 }}>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            textAlign: "center",
            color: themeColors.textDarkMode.textPrimary,
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          {t(
            "quizTexts.Now I will ask you a few short questions to get to know you better"
          )}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
          }}
        >
          <Text
            style={{
              ...theme.fonts.primary.bold,
              color: themeColors.textDarkMode.textPrimary,
              fontSize: 16,
            }}
          >
            {t("quizTexts.Amount")}:
          </Text>
          <Text
            style={{
              ...theme.fonts.primary.bold,
              backgroundColor: themeColors.neutralsLightMode.background,
              color: themeColors.textDarkMode.textInverted,
              paddingHorizontal: 10,
              minWidth: 90,
              padding: 5,
              fontSize: 16,
              borderRadius: 15,
              textAlign: "center",
            }}
          >
            {numberOfQuestions} {t("quizTexts.Questions")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
          }}
        >
          <Text
            style={{
              ...theme.fonts.primary.bold,
              color: themeColors.textDarkMode.textPrimary,
              fontSize: 16,
            }}
          >
            {t("quizTexts.Time")}:
          </Text>
          <Text
            style={{
              ...theme.fonts.primary.bold,
              backgroundColor: themeColors.neutralsLightMode.background,
              color: themeColors.textDarkMode.textInverted,
              paddingHorizontal: 10,
              minWidth: 90,
              padding: 5,
              fontSize: 16,
              borderRadius: 15,
              textAlign: "center",
            }}
          >
            {numberOfMinutes} {t("quizTexts.Minutes")}
          </Text>
        </View>
      </View>
      <GowiButton
        type="primary"
        onPress={() => {
          router.navigate("/(introduction)/IntoductionInitialQuestions");
        }}
        title={t("buttons.OK, let's begin")}
      ></GowiButton>
    </SafeAreaView>
  );
}
