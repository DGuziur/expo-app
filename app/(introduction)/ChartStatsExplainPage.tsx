import { useAuth } from "@/AuthContext";
import Accordion from "@/components/Accordion";
import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { NeonRadarChart } from "@/components/RadarChart";
import { IntroQuestion } from "@/data/newUserQuestions";
import { WELLBEING_CATEGORIES } from "@/data/wellbeingCategories";
import ArrowRight from "@assets/icons/ArrowRight.svg";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function ChartStatsExplainPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

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
        value: (g.total / g.count) * 2 || 1,
      };
    });
  }, [user?.onboardingQuestions]);

  return (
    <GowiSafeArea contentContainerStyle={{ padding: 20, maxHeight: "100%" }}>
      <GowiHeader
        content={<Text>✨{t("wellbeingProfile.Your wellbeing profile")}</Text>}
      ></GowiHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
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
      <View style={{ position: "absolute", bottom: 30, right: 30 }}>
        <GowiButton
          title={<ArrowRight></ArrowRight>}
          square
          type="primary"
          onPress={() =>
            router.navigate("/(introduction)/SelectAreaOfImprovement")
          }
        ></GowiButton>
      </View>
    </GowiSafeArea>
  );
}
