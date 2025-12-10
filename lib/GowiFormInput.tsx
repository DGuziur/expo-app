import { useTheme } from "@/themes/ThemeProvider";
import Visibility from "@assets/icons/visibility.svg";
import VisibilityOff from "@assets/icons/visibility_off.svg";
import { useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
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
  autoCapitalize = "none",
  editable = true,
  multiline = false,
}: GowiInputProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[
        { alignSelf: "center", marginVertical: 8, opacity: 0.9, width: "100%" },
        customStyles,
      ]}
    >
      {label && (
        <Text
          style={[
            {
              ...theme.fonts.primary.regular,
              color: theme.textDarkMode.textPrimary,
              fontSize: 12,
              textAlign: "left",
              marginBottom: 8,
            },
            labelStyles,
            { color: theme.textDarkMode.textTeritary },
          ]}
        >
          {label}:
        </Text>
      )}
      <Controller
        control={control}
        name={controlName}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View style={{ justifyContent: "center" }}>
              <TextInput
                style={[
                  { backgroundColor: theme.neutralsDarkMode.surface },
                  {
                    ...theme.fonts.primary.regular,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.neutralsDarkMode.divider,
                    paddingHorizontal: 24,
                    paddingRight: secureTextEntry ? 50 : 24,
                    paddingVertical: 17,
                    fontSize: 16,
                    color: theme.textDarkMode.textPrimary,
                    minHeight: 60,
                    width: "100%",
                  },
                  inputStyles,
                  error && {
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.textDarkMode.textError,
                  },
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.textDarkMode.textTeritary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={multiline}
                numberOfLines={numberOfLines}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                editable={editable}
              />

              {secureTextEntry && (
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: 16,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={0.7}
                >
                  {isPasswordVisible ? (
                    <Visibility></Visibility>
                  ) : (
                    <VisibilityOff></VisibilityOff>
                  )}
                </TouchableOpacity>
              )}
            </View>

            {error && (
              <Text
                style={[
                  {
                    ...theme.fonts.primary.regular,
                    color: "#ff4444",
                    fontSize: 14,
                    marginTop: 4,
                    marginLeft: 4,
                  },
                  errorStyles,
                ]}
              >
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}
