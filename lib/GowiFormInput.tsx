import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface GowiInputProps {
  control: Control<any>;
  controlName: string;
  rules?: RegisterOptions;
  inputStyles?: StyleProp<TextStyle>;
  customStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
  secureTextEntry?: boolean;
  errorStyles?: StyleProp<TextStyle>;
  editable?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function GowiFormInput({
  inputStyles,
  customStyles,
  labelStyles,
  label,
  placeholder,
  control,
  controlName,
  rules,
  numberOfLines,
  secureTextEntry = false,
  keyboardType = "default",
  errorStyles,
  autoCapitalize = "sentences",
  editable = true,
  multiline = false,
}: GowiInputProps) {
  return (
    <View style={[styles.container, customStyles]}>
      {label && <Text style={[styles.label, labelStyles]}>{label}:</Text>}
      <Controller
        control={control}
        name={controlName}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[styles.input, inputStyles, error && styles.inputError]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline={multiline}
              numberOfLines={numberOfLines}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              editable={editable}
              placeholderTextColor="#999"
            />
            {error && (
              <Text style={[styles.errorText, errorStyles]}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 8,
    opacity: 0.9,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 14,
  },
  input: {
    backgroundColor: "rgba(0,0,0, 0.05)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
    minHeight: 60,
    width: "100%",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
