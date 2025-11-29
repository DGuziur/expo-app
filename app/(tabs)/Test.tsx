import { themeColors } from "@/themes/themeColors";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NeonRadarChart, RadarDataPoint } from "./../../components/RadarChart"; // Załóżmy, że plik jest obok

export default function App() {
  const chartData: RadarDataPoint[] = [
    {
      value: 5,
      icon: <MaterialCommunityIcons name="heart" size={20} color="#FF6B6B" />,
    },
    {
      value: 9,
      icon: <FontAwesome5 name="question" size={18} color="#FFA500" />,
    },
    {
      value: 5,
      icon: <Ionicons name="umbrella" size={20} color="#FFA500" />,
    },
    {
      value: 5,
      icon: (
        <MaterialCommunityIcons
          name="account-group"
          size={22}
          color="#FFA500"
        />
      ),
    },
    {
      value: 7,
      icon: <MaterialCommunityIcons name="bird" size={22} color="#FFA500" />,
    },
    {
      value: 7,
      icon: <MaterialCommunityIcons name="email" size={22} color="#FFA500" />,
    },
    {
      value: 4,
      icon: (
        <MaterialCommunityIcons name="message-text" size={20} color="#FFA500" />
      ),
    },
    {
      value: 10,
      icon: <Ionicons name="person" size={20} color="#FFA500" />,
    },
  ];

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0, y: 0 }}
      colors={themeColors.gradientsDarkMOde.background}
    >
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Wellbeing Chart</Text>

      <View style={styles.chartWrapper}>
        <NeonRadarChart data={chartData} size={230} maxValue={10} />
      </View>
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
  chartWrapper: {
    // Opcjonalnie dodatkowy cień pod całym wykresem
    shadowColor: "#FF3300",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
});
