import { useAuth } from "@/AuthContext";
import GowiButton from "@/components/GowiButton";
import { NeonRadarChart } from "@/components/RadarChart";
import { IntroQuestion } from "@/data/newUserQuestions";
import { themeColors } from "@/themes/themeColors";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function ChartStatsExplainPage() {
  const { user } = useAuth();
  const chartData = useMemo(() => {
    if (!user?.onboardingQuestions) return [];

    const groupedByCategory = user.onboardingQuestions.reduce(
      (acc: any, question: IntroQuestion) => {
        const category = question.category;

        if (!acc[category]) {
          acc[category] = {
            total: 0,
            count: 0,
          };
        }

        acc[category].total += question.answer;
        acc[category].count += 1;

        return acc;
      },
      {} as Record<string, { total: number; count: number }>
    );

    const categoryIcons: Record<string, React.ReactNode> = {
      "wellbeingProfile.BODY AND ENERGY": (
        <MaterialCommunityIcons name="heart" size={20} color="#FF6B6B" />
      ),
      "wellbeingProfile.FEELINGS AND THOUGHTS": (
        <FontAwesome5 name="question" size={18} color="#FFA500" />
      ),
      "wellbeingProfile.MEANING AND DEVELOPMENT": (
        <Ionicons name="umbrella" size={20} color="#FFA500" />
      ),
      "wellbeingProfile.QUALITY OF LIFE AND SAFETY": (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
      "wellbeingProfile.RELATIONSHIPS AND PARTICIPATION": (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
      "wellbeingProfile.ACTION AND AUTONOMY": (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
      "wellbeingProfile.RESILIENCE AND SELF-TRUST": (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
      "wellbeingProfile.CONTACT WITH SELF AND COMMUNICATION": (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
    };

    return Object.entries(groupedByCategory).map(
      ([category, data]: [...any]) => ({
        value: Math.max((data.total / data.count) * 2, 1),
        icon: categoryIcons[category] || (
          <MaterialCommunityIcons
            name="account-group"
            size={22}
            color="#FFA500"
          />
        ),
      })
    );
  }, [user?.onboardingQuestions]);
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0, y: 0 }}
      colors={themeColors.gradientsDarkMOde.background}
    >
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Wellbeing Chart</Text>

      <View>
        <NeonRadarChart data={chartData} size={230} maxValue={10} />
      </View>
      <GowiButton
        title="Ja chcę jeszcze raz!"
        type="primary"
        onPress={() => {
          router.replace("/(auth)/LoginPage");
        }}
      ></GowiButton>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
