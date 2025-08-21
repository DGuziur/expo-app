import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Spinner({
  size = 40,
  color = "#007AFF",
  style = {},
  strokeWidth = 4,
}) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => spin());
    };

    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderWidth: strokeWidth,
            borderColor: `${color}20`, // Transparentne tło
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
}

// Alternatywny spinner z kropkami
export function DotsSpinner({ size = 8, color = "#007AFF", style = {} }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      const duration = 600;
      const delay = 200;

      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dot1, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(dot2, {
              toValue: 1,
              duration,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(dot3, {
              toValue: 1,
              duration,
              delay: delay * 2,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(dot1, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(dot2, {
              toValue: 0,
              duration,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(dot3, {
              toValue: 0,
              duration,
              delay: delay * 2,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateDots();
  }, [dot1, dot2, dot3]);

  const scale1 = dot1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const scale2 = dot2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const scale3 = dot3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={[styles.dotsContainer, style]}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            backgroundColor: color,
            transform: [{ scale: scale1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            backgroundColor: color,
            transform: [{ scale: scale2 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            backgroundColor: color,
            transform: [{ scale: scale3 }],
          },
        ]}
      />
    </View>
  );
}

// Pulsujący spinner
export function PulseSpinner({ size = 40, color = "#007AFF", style = {} }) {
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, [pulseValue]);

  const scale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const opacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.pulse,
          {
            width: size,
            height: size,
            backgroundColor: color,
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    borderRadius: 1000,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    borderRadius: 1000,
  },
  pulse: {
    borderRadius: 1000,
  },
});
