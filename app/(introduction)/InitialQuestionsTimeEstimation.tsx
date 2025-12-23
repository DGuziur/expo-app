import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { IntroQuestions } from "@/data/newUserQuestions";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import Gowi from "@assets/images/gowiButterfly.png";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

export default function InitialQuestionsTimeEstimation() {
  const { t } = useTranslation();
  const theme = useTheme();
  const numberOfQuestions = IntroQuestions.length;
  const numberOfMinutes = Math.ceil((numberOfQuestions * 6) / 60);
  return (
    <GowiSafeArea
      contentContainerStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 40,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}></View>
      <GowiHeader
        backPossible={false}
        content={t("quizTexts.Great that you are here")}
      ></GowiHeader>
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
    </GowiSafeArea>
  );
}
