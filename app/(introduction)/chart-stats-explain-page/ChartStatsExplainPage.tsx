import { useAuth } from "@/AuthContext";
import Accordion from "@/components/Accordion";
import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import { NeonRadarChart } from "@/components/RadarChart";
import { IntroQuestion } from "@/data/newUserQuestions";
import { WELLBEING_CATEGORIES } from "@/data/wellbeingCategories";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import BackButtonSvg from "@assets/icons/BackArrow.svg";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChartStatsExplainPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const onBackBtnPress = () => {
    router.replace("/(introduction)/IntoductionInitialQuestions");
  };
  const categoryResults = useMemo(() => {
    if (!user?.onboardingQuestions) return [];

    const grouped = user.onboardingQuestions.reduce(
      (
        acc: Record<string, { total: number; count: number }>,
        question: IntroQuestion
      ) => {
        if (!acc[question.category]) {
          acc[question.category] = { total: 0, count: 0 };
        }

        acc[question.category].total += question.answer ?? 0;
        acc[question.category].count += 1;

        return acc;
      },
      {}
    );

    return WELLBEING_CATEGORIES.map((category) => {
      const g = grouped[category.title] ?? { total: 0, count: 0 };

      return {
        ...category,
        total: g.total,
        count: g.count,
        value: (g.total / g.count) * 2,
      };
    });
  }, [user?.onboardingQuestions]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GowiButton
          square
          type="secondary"
          size="S"
          onPress={() => onBackBtnPress()}
          title={<BackButtonSvg></BackButtonSvg>}
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
            ✨{t("wellbeingProfile.Your wellbeing profile")}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      <ChatBubble
        text={t(
          "wellbeingProfile.Here is what your current state looks like in various areas of life GROWWEB"
        )}
      ></ChatBubble>

      <View>
        <NeonRadarChart data={categoryResults} size={230} maxValue={10} />
      </View>

      <View>
        {categoryResults.map((category, index) => {
          return (
            <Accordion
              key={index}
              icon={category.icon}
              value={(category.value / 10) * 100}
              title={t(category.title)}
              hiddenText={t(category.description)}
            ></Accordion>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 50,
    padding: 20,
    paddingTop: 30,
  },
});
