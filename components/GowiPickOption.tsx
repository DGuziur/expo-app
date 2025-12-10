import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OPTIONS = [
  {
    value: "female",
    labelKey: "Kobieta",
    colorMain: "#930049",
    colorShadow: "#E5007A",
  },
  {
    value: "male",
    labelKey: "Mężczyzna",
    colorMain: "#BE4A00",
    colorShadow: "#EB6900",
  },
  {
    value: "other",
    labelKey: "Inne",
    colorMain: "#481878",
    colorShadow: "#6A2AAB",
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
  const { t } = useTranslation();
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
                <TouchableOpacity
                  key={option.value}
                  activeOpacity={0.8}
                  onPress={() => onChange(option.value)}
                  style={[
                    styles.buttonShadow,
                    {
                      backgroundColor: option.colorShadow,
                      opacity: value && !isSelected ? 0.2 : 1,
                    },
                    isSelected && { paddingBottom: 0 },
                  ]}
                >
                  <View
                    style={[
                      styles.buttonFace,
                      { backgroundColor: option.colorMain },
                    ]}
                  >
                    <Text
                      style={{
                        ...theme.fonts.primary.bold,
                        color: themeColors.textDarkMode.textPrimary,
                        fontSize: 11,
                      }}
                    >
                      {t(option.labelKey, { defaultValue: option.labelKey })}
                    </Text>
                  </View>
                </TouchableOpacity>
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
    justifyContent: "space-between",
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
