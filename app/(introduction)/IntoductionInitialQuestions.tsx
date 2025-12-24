import GowiButton from "@/components/GowiButton";
import GowiSafeArea from "@/components/GowiSafeArea";
import ProgressStages from "@/components/ProgressStages";
import { IntroQuestionAnswers, IntroQuestions } from "@/data/newUserQuestions";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import ArrowRight from "@assets/icons/ArrowRight.svg";
import CheckSVG from "@assets/icons/Check.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, ColorValue, Text, View } from "react-native";

const customGradients: Record<number, [ColorValue, ColorValue]> = {
  0: ["#331155", "#331155"],
  1: ["#40156A", "#40156A"],
  2: ["#4C1A80", "#4C1A80"],
  3: ["#6522AA", "#6522AA"],
  4: ["#7929CB", "#7929CB"],
  5: ["#8638D7", "#8638D7"],
};

export default function NewUserQuestions() {
  const theme = useTheme();
  const { t } = useTranslation();
  const totalStages = IntroQuestions.length;
  const [isAnimating, setIsAnimating] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [progressState, setProgressState] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const CategoryIcon = IntroQuestions[progressState].categoryIcon;

  const opacity = useRef(new Animated.Value(1)).current;

  const submitAnswers = async () => {
    await AsyncStorage.setItem(
      "onboardingQuestions",
      JSON.stringify(
        IntroQuestions.map((question, index) => {
          return {
            category: question.category,
            question: question.questionText,
            answer: answers[index],
          };
        })
      )
    );
    router.navigate("/(introduction)/ChartStatsExplainPage");
  };

  const handleAnswerClick = (pointsValue: number) => {
    if (isAnimating) return;
    setAnswers((prev) => ({
      ...prev,
      [progressState]: pointsValue,
    }));

    if (progressState < totalStages - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setProgressState((stage) => stage + 1);
          opacity.setValue(1);
          setIsAnimating(false);
        });
      }, 200);
    } else {
      setCanSubmit(true);
    }
  };

  return (
    <GowiSafeArea
      contentContainerStyle={{ padding: 10, maxHeight: "100%" }}
      scrollable={false}
    >
      <ProgressStages
        total={totalStages}
        current={progressState + 1}
        onBackBtnPress={() => {
          if (progressState === 0) return router.back();
          setProgressState((state) => (state > 0 ? state - 1 : 0));
        }}
      />
      <Animated.ScrollView
        pointerEvents={isAnimating ? "none" : "auto"}
        style={{ opacity }}
        contentContainerStyle={{
          paddingBottom: canSubmit ? 69 : 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 24 }}
        >
          <Text
            style={{
              ...theme.fonts.primary.semiBold,
              fontSize: 16,
              color: themeColors.textDarkMode.textSecondary,
            }}
          >
            {t(IntroQuestions[progressState].category)}
          </Text>
          <CategoryIcon width={48} height={48} />
          <Text
            style={{
              ...theme.fonts.primary.bold,
              fontSize: 22,
              color: themeColors.textDarkMode.textPrimary,
              textAlign: "center",
            }}
          >
            {t(IntroQuestions[progressState].questionText)}
          </Text>
        </View>

        <View style={{ gap: 24 }}>
          <Text
            style={{
              ...theme.fonts.primary.regular,
              fontSize: 14,
              color: themeColors.textDarkMode.textSecondary,
              textAlign: "center",
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
                    size="S"
                    customStyle={{
                      width: 250,
                    }}
                    customGradient={customGradients[i]}
                    textStyle={{ width: "100%" }}
                    title={answer.answerText}
                    type="secondary"
                    onPress={() => handleAnswerClick(answer.pointsValue)}
                  />
                  {answers[progressState] === answer.pointsValue ? (
                    <CheckSVG
                      style={{ position: "absolute", right: -10 }}
                      width={32}
                      height={32}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>
      </Animated.ScrollView>
      {canSubmit && (
        <View style={{ position: "absolute", bottom: 30, right: 50 }}>
          <GowiButton
            title={<ArrowRight />}
            square
            type="primary"
            onPress={submitAnswers}
          />
        </View>
      )}
    </GowiSafeArea>
  );
}
