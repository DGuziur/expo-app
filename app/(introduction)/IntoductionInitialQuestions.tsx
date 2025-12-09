import { useAuth } from "@/AuthContext";
import GowiButton from "@/components/GowiButton";
import GowiSafeArea from "@/components/GowiSafeArea";
import ProgressStages from "@/components/ProgressStages";
import { IntroQuestionAnswers, IntroQuestions } from "@/data/newUserQuestions";
import { app } from "@/firebaseInit";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import ArrowRight from "@assets/icons/ArrowRight.svg";
import CheckSVG from "@assets/icons/Check.svg";
import { router } from "expo-router";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Text, View } from "react-native";

export default function NewUserQuestions() {
  const { user } = useAuth();
  const db = getFirestore(app);
  const theme = useTheme();
  const { t } = useTranslation();
  const totalStages = IntroQuestions.length;
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [progressState, setProgressState] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const CategoryIcon = IntroQuestions[progressState].categoryIcon;

  const opacity = useRef(new Animated.Value(1)).current;

  const submitAnswers = async () => {
    if (!user) return;
    await updateDoc(doc(db, "Users", user.uid), {
      hasCompletedOnboarding: true,
      onboardingQuestions: IntroQuestions.map((question, index) => {
        return {
          category: question.category,
          question: question.questionText,
          answer: answers[index],
        };
      }),
    });

    router.navigate("/(introduction)/ChartStatsExplainPage");
  };

  const handleAnswerClick = (pointsValue: number) => {
    setAnswers((prev) => ({
      ...prev,
      [progressState]: pointsValue,
    }));

    if (progressState < totalStages - 1) {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setProgressState((stage) => stage + 1);
          opacity.setValue(1);
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
        style={{ opacity }}
        contentContainerStyle={{
          paddingBottom: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            fontSize: 19,
            color: themeColors.textDarkMode.textSecondary,
          }}
        >
          {t(IntroQuestions[progressState].category)}
        </Text>
        <CategoryIcon width={80} height={80} />
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

        <Text
          style={{
            ...theme.fonts.primary.regular,
            fontSize: 16,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            paddingVertical: 30,
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
                  customStyle={{
                    width: 250,
                    height: 52,
                    padding: 4,
                    position: "relative",
                  }}
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
