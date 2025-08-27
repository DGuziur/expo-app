import React from "react";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

interface GowiInputProps {
  customStyles?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export default function GowiInput({
  customStyles,
  placeholder,
  value,
  onChange,
  onBlur,
}: GowiInputProps) {
  return (
    <TextInput
      style={[styles.input, customStyles]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e4e4e4ff",
    alignSelf: "center",
    borderRadius: 30,
    padding: 15,
    lineHeight: 32,
  },
});
