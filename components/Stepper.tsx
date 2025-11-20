import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface StepperDotsProps {
  currentStep: number;
  totalSteps: number;
  dotSize?: number;
  activeDotWidth?: number;
}

const StepperDot = ({
  isActive,
  isPassed,
  dotSize,
  activeDotWidth,
}: {
  isActive: boolean;
  isPassed: boolean;
  dotSize: number;
  activeDotWidth: number;
}) => {
  const animValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: false,
      friction: 20,
      tension: 60,
    }).start();
  });

  const width = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [dotSize, activeDotWidth],
  });

  const backgroundColor = isPassed
    ? "rgba(34, 211, 238, 0.6)"
    : "rgba(34, 211, 238, 0.2)";

  const activeOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Animated.View style={[styles.dotContainer, { width, height: dotSize }]}>
      <View style={[styles.dot, { backgroundColor, position: "absolute" }]} />

      <Animated.View style={{ opacity: activeOpacity, flex: 1 }}>
        <View
          style={[styles.glowLayer, { width: activeDotWidth, height: dotSize }]}
        />

        <LinearGradient
          colors={["#22d3ee", "#10b981"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.activeDotFill}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default function Stepper({
  currentStep,
  totalSteps,
  dotSize = 12,
  activeDotWidth = 48,
}: StepperDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep - 1;
        const isPassed = index < currentStep - 1;

        return (
          <StepperDot
            key={index}
            isActive={isActive}
            isPassed={isPassed}
            dotSize={dotSize}
            activeDotWidth={activeDotWidth}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
  },
  dotContainer: {
    position: "relative",
    borderRadius: 100,
    overflow: "visible",
  },
  dot: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  activeDotFill: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    shadowColor: "#22d3ee",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  glowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: "rgba(34, 211, 238, 0.4)",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    zIndex: -1,
  },
});
