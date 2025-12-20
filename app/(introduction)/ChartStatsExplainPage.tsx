import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import Accordion from "@/components/Accordion";
import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { NeonRadarChart, RadarDataPoint } from "@/components/RadarChart";

import { IntroQuestion } from "@/data/newUserQuestions";
import { WELLBEING_CATEGORIES } from "@/data/wellbeingCategories";
import ArrowRight from "@assets/icons/ArrowRight.svg";

export default function ChartStatsExplainPage() {
  const { t } = useTranslation();
  const [results, setResults] = useState<RadarDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("onboardingQuestions");
        if (!data) return;

        const questions: IntroQuestion[] = JSON.parse(data);
        const grouped = questions.reduce(
          (acc: Record<string, { total: number; count: number }>, q) => {
            acc[q.category] = acc[q.category] || { total: 0, count: 0 };
            acc[q.category].total += q.answer ?? 0;
            acc[q.category].count += 1;
            return acc;
          },
          {}
        );

        const processed: RadarDataPoint[] = WELLBEING_CATEGORIES.map((cat) => {
          const stats = grouped[cat.title] || { total: 0, count: 0 };
          return {
            ...cat,
            total: stats.total,
            count: stats.count,
            value: stats.count > 0 ? (stats.total / stats.count) * 2 : 1,
          };
        });

        setResults(processed);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <GowiSafeArea>
        <ActivityIndicator />
      </GowiSafeArea>
    );

  return (
    <GowiSafeArea contentContainerStyle={{ padding: 20, flex: 1 }}>
      <GowiHeader
        content={<Text>✨{t("wellbeingProfile.Your wellbeing profile")}</Text>}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
      >
        <ChatBubble
          text={t(
            "wellbeingProfile.Here is what your current state looks like in various areas of life GROWWEB"
          )}
        />

        <View style={{ alignItems: "center" }}>
          {results.length > 0 && (
            <NeonRadarChart data={results} size={230} maxValue={10} />
          )}
        </View>

        <View style={{ width: "100%" }}>
          {results.map((item, i) => (
            <Accordion
              key={i}
              icon={item.icon}
              title={t(item.title)}
              hiddenText={t(item.description)}
              value={(item.value / 10) * 100}
            />
          ))}
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 30, right: 30 }}>
        <GowiButton
          title={<ArrowRight />}
          square
          onPress={() =>
            router.navigate("/(introduction)/SelectAreaOfImprovement")
          }
        />
      </View>
    </GowiSafeArea>
  );
}
