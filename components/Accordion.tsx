import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { FunctionComponent, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface AccordionProps {
  icon: FunctionComponent;
  title: string;
  value: number;
  hiddenText: string;
}

export default function Accordion({
  title,
  icon,
  value,
  hiddenText,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const Icon = icon;
  return (
    <>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: 10,
          borderRadius: 15,
          backgroundColor: themeColors.neutralsDarkMode.surfaceElev,
          borderBottomWidth: 5,
          borderBottomColor: "#4C2B59",
        }}
      >
        <Text style={{ width: 30 }}>
          <Icon></Icon>
        </Text>
        <Text
          style={{
            ...theme.fonts.primary.medium,
            color: themeColors.textDarkMode.textPrimary,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...theme.fonts.primary.bold,
            marginLeft: "auto",
            borderRadius: 5,
            paddingHorizontal: 5,
            backgroundColor: themeColors.textDarkMode.textPrimary,
            color: themeColors.neutralsDarkMode.background,
          }}
        >
          {value}%
        </Text>
      </Pressable>
      {isOpen && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 10,
            borderRadius: 15,
            backgroundColor: themeColors.secondary[900],
            borderBottomWidth: 5,
            borderBottomColor: themeColors.secondary[700],
          }}
        >
          <Text
            style={{
              ...theme.fonts.primary.medium,
              color: themeColors.textDarkMode.textPrimary,
            }}
          >
            {hiddenText}
          </Text>
        </View>
      )}
    </>
  );
}
