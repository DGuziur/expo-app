import GowiButton from "@/components/GowiButton";
import ProgressStages from "@/components/ProgressStages";
import { IntroQuestionAnswers, IntroQuestions } from "@/data/newUserQuestions";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import CheckSVG from "@assets/icons/Check.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

export default function NewUserQuestions() {
  const theme = useTheme();
  const { t } = useTranslation();
  const totalStages = IntroQuestions.length;
  const [progressState, setProgressState] = useState(0);
  const CategoryIcon = IntroQuestions[progressState].categoryIcon;

  const submitAnswers = () => {
    console.log(IntroQuestions);
  };

  const handleAnswerClick = (pointsValue: number) => {
    console.log(progressState);
    if (progressState < totalStages - 1) {
      IntroQuestions[progressState].answer = pointsValue;
      setProgressState(progressState + 1);
    } else {
      IntroQuestions[progressState].answer = pointsValue;
      submitAnswers();
    }
  };

  return (
    <SafeAreaView>
      <ProgressStages
        total={totalStages}
        current={progressState + 1}
        onBackBtnPress={() =>
          setProgressState((state) => (state > 0 ? state - 1 : 0))
        }
      ></ProgressStages>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            fontSize: 19,
            color: themeColors.textDarkMode.textSecondary,
          }}
        >
          {t(IntroQuestions[progressState].category)}
        </Text>
        <CategoryIcon></CategoryIcon>
        <Text
          style={{
            ...theme.fonts.primary.bold,
            fontSize: 22,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            paddingVertical: 40,
          }}
        >
          {t(IntroQuestions[progressState].questionText)}
        </Text>

        <Text
          style={{
            ...theme.fonts.primary.regular,
            fontSize: 16,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            paddingVertical: 40,
          }}
        >
          {t("quizTexts.To what extent does this apply to you? (0-5)")}
        </Text>
        <View style={{ gap: 10 }}>
          {IntroQuestionAnswers.map((answer, i) => {
            return (
              <View
                key={i}
                style={{
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GowiButton
                  styles={{
                    width: 250,
                    height: 52,
                    padding: 4,
                    position: "relative",
                  }}
                  textStyles={{ width: "100%" }}
                  title={answer.answerText}
                  type="secondary"
                  onPress={() => handleAnswerClick(answer.pointsValue)}
                ></GowiButton>
                {IntroQuestions[progressState].answer === answer.pointsValue ? (
                  <CheckSVG
                    style={{ position: "absolute", right: -10 }}
                    width={32}
                    height={32}
                  ></CheckSVG>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
