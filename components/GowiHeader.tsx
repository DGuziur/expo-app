import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import BackButtonSVG from "@assets/icons/BackArrow.svg";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import GowiButton from "./GowiButton";

interface GowiHeaderProps {
  content: string | ReactNode;
  backPossible?: boolean;
}

export default function GowiHeader({
  content,
  backPossible = true,
}: GowiHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {backPossible && (
        <GowiButton
          square
          type="secondary"
          size="S"
          onPress={() => router.back()}
          title={<BackButtonSVG></BackButtonSVG>}
        ></GowiButton>
      )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...theme.fonts.primary.bold,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          {content}
        </Text>
      </View>
    </View>
  );
}
