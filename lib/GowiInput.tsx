import React from "react";
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
  customStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  value?: string;
  numberOfLines?: number;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
  onChange?: (text: string) => void;
  onBlur?: () => void;
}

export default function GowiInput({
  customStyles,
  containerStyles,
  labelStyles,
  label,
  placeholder,
  value,
  numberOfLines,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  editable = true,
  multiline = false,
  onChange,
  onBlur,
}: GowiInputProps) {
  return (
    <View style={[styles.container, containerStyles]}>
      {label && <Text style={[styles.label, labelStyles]}>{label}:</Text>}
      <TextInput
        style={[styles.input, customStyles]}
        placeholder={placeholder}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 8,
    opacity: 0.9,
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
});
