import { useTheme } from "@/themes/ThemeProvider";
import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import GowiChip from "./GowiChip";

interface option {
  value: string;
  labelKey: string;
  variant: "primary" | "secondary" | "accent";
}

const OPTIONS: option[] = [
  {
    value: "female",
    labelKey: "Kobieta",
    variant: "accent",
  },
  {
    value: "male",
    labelKey: "Mężczyzna",
    variant: "primary",
  },
  {
    value: "other",
    labelKey: "Inne",
    variant: "secondary",
  },
];

interface GowiPickOptionProps {
  control: Control<any>;
  controlName: string;
  label: string;
  rules?: RegisterOptions;
}

export default function GowiPickOption({
  control,
  controlName,
  label,
  rules,
}: GowiPickOptionProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            ...theme.fonts.primary.regular,
            color: theme.textDarkMode.textPrimary,
            fontSize: 12,
            textAlign: "left",
            marginBottom: 8,
          },
          { color: theme.textDarkMode.textTeritary },
        ]}
      >
        {label}:
      </Text>

      <Controller
        control={control}
        name={controlName}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.optionsContainer}>
            {OPTIONS.map((option) => {
              const isSelected = value === option.value;

              return (
                <GowiChip
                  key={option.value}
                  variant={option.variant}
                  onPress={() => onChange(option.value)}
                  isActive={isSelected}
                >
                  {option.value}
                </GowiChip>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
  },
  sectionLabel: {
    fontSize: 18,
    color: "#4A4A4F",
    marginBottom: 10,
    marginLeft: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonShadow: {
    flex: 1,
    borderRadius: 25,
    paddingBottom: 6,
  },
  buttonFace: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
