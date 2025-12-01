import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface ChartBubbleProps {
  text: string;
  direction?: "left" | "right";
  style?: ViewStyle;
}

export default function ChatBubble({
  text,
  direction = "left",
  style,
}: ChartBubbleProps) {
  const isLeft = direction === "left";

  return (
    <View
      style={[
        styles.container,
        isLeft ? styles.alignLeft : styles.alignRight,
        style,
      ]}
    >
      <View
        style={[styles.bubble, isLeft ? styles.bubbleLeft : styles.bubbleRight]}
      >
        <Text style={styles.text}>{text}</Text>

        <View
          style={[styles.arrow, isLeft ? styles.arrowLeft : styles.arrowRight]}
        />
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#3E2445",
  shadow: "#29162E",
  text: "#F0E6F5",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  bubble: {
    backgroundColor: COLORS.bg,
    padding: 16,
    borderRadius: 16,
    maxWidth: "85%",
    borderBottomWidth: 6,
    borderBottomColor: COLORS.shadow,
    position: "relative",
  },
  bubbleLeft: {
    borderTopLeftRadius: 4,
  },
  bubbleRight: {
    borderTopRightRadius: 4,
    backgroundColor: "#5A3860",
    borderBottomColor: "#3E2445",
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
  },
  arrow: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
  },
  arrowLeft: {
    left: -12,
    top: 0,
    borderRightWidth: 15,
    borderRightColor: COLORS.bg,
  },
  arrowRight: {
    right: -12,
    top: 0,
    borderLeftWidth: 15,
    borderLeftColor: "#5A3860",
  },
});
