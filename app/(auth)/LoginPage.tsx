import { styles } from "@/assets/styles/auth.styles";
import GowiButton from "@/components/GowiButton";
import GowiSafeArea from "@/components/GowiSafeArea";
import { auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import ArrowRight from "@assets/icons/ArrowRight.svg";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const loginForm = useForm({
    delayError: 3000,
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async (formData: LoginForm) => {
    await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).catch((err: FirebaseError) => {
      loginForm.reset();
      setFirebaseError(getAuthErrorNamePl(err.code));
    });
  };

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <GowiSafeArea>
      <Text
        style={{
          ...theme.fonts.primary.semiBold,
          fontSize: 18,
          color: theme.textDarkMode.textPrimary,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        {t("loginTexts.Welcome back!")}
      </Text>
      <Text
        style={{
          ...theme.fonts.primary.regular,
          fontSize: 16,
          textAlign: "center",
          color: theme.textDarkMode.textPrimary,
          marginBottom: 10,
        }}
      >
        {t("loginTexts.Log in to continue your journey with Gowi.")}
      </Text>

      {firebaseError && <Text style={styles.errorText}>{firebaseError}</Text>}

      <GowiButton
        title={t("buttons.Don't have an account? Register.")}
        size="L"
        textOnly
        underline
        textStyle={{
          ...theme.fonts.primary.semiBold,
          color: theme.textDarkMode.textSecondary,
        }}
        customStyle={{ marginLeft: "auto" }}
        onPress={() => {
          router.push("/(auth)/SignUpPage");
        }}
      />
      <GowiFormInput
        control={loginForm.control}
        controlName="email"
        label="E-mail"
        placeholder={t("formsInfo.address@email")}
        keyboardType={"email-address"}
        rules={{
          required: "Email is required",
        }}
      ></GowiFormInput>
      <GowiFormInput
        control={loginForm.control}
        controlName="password"
        label={t("formsInfo.Password")}
        placeholder={t("formsInfo.Password")}
        secureTextEntry={true}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: t("errorMessages.Password is too short."),
          },
        }}
      ></GowiFormInput>

      <GowiButton
        title={t("buttons.Forgot your password?")}
        size="L"
        textOnly
        underline
        textStyle={{
          ...theme.fonts.primary.semiBold,
          color: theme.textDarkMode.textSecondary,
          textAlign: "right",
        }}
        customStyle={{ alignContent: "flex-end" }}
        onPress={() => {
          router.push("/(auth)/SignUpPage");
        }}
      />
      <GowiButton
        title={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={{
                ...theme.fonts.primary.semiBold,
                verticalAlign: "middle",
                color: themeColors.textDarkMode.textPrimary,
              }}
            >
              {t("buttons.Log in")}
            </Text>
            <ArrowRight height={13} />
          </View>
        }
        size="L"
        onPress={loginForm.handleSubmit(signIn)}
      ></GowiButton>
    </GowiSafeArea>
  );
}
