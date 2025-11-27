import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import BackButtonSvg from "@assets/icons/BackArrow.svg";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GowiButton from "./GowiButton";

interface ProgressStagesProps {
  current: number;
  total: number;
  onBackBtnPress: Function;
}

export default function ProgressStages({
  current,
  total,
  onBackBtnPress,
}: ProgressStagesProps) {
  const MAX_STAGES = 8;
  const stageCount = Math.min(total, MAX_STAGES);
  const stepsPerStage = total / stageCount;
  const theme = useTheme();

  const getStageOpacity = (stageIndex: number): number => {
    const stageStart = stageIndex * stepsPerStage;
    const stageEnd = stageStart + stepsPerStage;

    if (current >= stageEnd) {
      return 1;
    } else if (current > stageStart) {
      const progress = (current - stageStart) / stepsPerStage;
      return 0.2 + progress * 0.8;
    } else {
      return 0.2;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <GowiButton
          square
          type="secondary"
          size="S"
          onPress={() => onBackBtnPress()}
          title={<BackButtonSvg></BackButtonSvg>}
        ></GowiButton>
      </View>
      <View style={styles.stagesContainer}>
        {Array.from({ length: stageCount }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.stage,
              {
                backgroundColor: "#4ECDC4",
                opacity: getStageOpacity(index),
              },
            ]}
          />
        ))}
      </View>

      <Text style={[styles.counter, theme.fonts.primary.regular]}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  stagesContainer: {
    flexDirection: "row",
  },
  stage: {
    width: 22,
    height: 12,
    borderRadius: 6,
  },
  counter: {
    flex: 1,
    color: themeColors.textDarkMode.textPrimary,
    fontSize: 16,
  },
});
