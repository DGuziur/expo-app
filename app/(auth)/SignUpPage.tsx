import { styles } from "@/assets/styles/auth.styles";
import GowiButton from "@/components/GowiButton";
import GowiSafeArea from "@/components/GowiSafeArea";
import { app, auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { useTheme } from "@/themes/ThemeProvider";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface SignInForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [loginError, setLoginError] = useState<string | null>(null);
  const db = getFirestore(app);
  const signInForm = useForm({
    delayError: 3000,
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = async (formData: SignInForm) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).catch((err: FirebaseError) =>
      setLoginError(getAuthErrorNamePl(err.code))
    );
    if (!userCredential) return;

    await setDoc(doc(db, "Users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      createdAt: serverTimestamp(),
      hasCompletedOnboarding: false,
    });
  };

  return (
    <GowiSafeArea contentContainerStyle={{ padding: 15, maxWidth: 290 }}>
      <Text
        style={{
          ...theme.fonts.primary.semiBold,
          fontSize: 18,
          color: theme.textDarkMode.textPrimary,
          textAlign: "center",
        }}
      >
        {t("createAccTexts.Create your account")}
      </Text>
      <Text
        style={{
          ...theme.fonts.primary.regular,
          fontSize: 16,
          textAlign: "center",
          color: theme.textDarkMode.textPrimary,
        }}
      >
        {t(
          "createAccTexts.This will allow us to save your progress and tailor your development path to you"
        )}
      </Text>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <GowiFormInput
        label="email"
        control={signInForm.control}
        controlName="email"
        placeholder="email"
        rules={{
          required: "Email is wymagany",
        }}
      ></GowiFormInput>
      <GowiFormInput
        label="hasło"
        control={signInForm.control}
        controlName="password"
        placeholder="Hasło"
        secureTextEntry
        rules={{
          required: "Wpisz hasło",
        }}
      ></GowiFormInput>
      <GowiFormInput
        label="potwierdź hasło"
        control={signInForm.control}
        controlName="confirmPassword"
        placeholder="potwierdź hasło"
        secureTextEntry
        rules={{
          required: "Wpisz hasło",
          validate: (value) =>
            value === signInForm.watch("password") ||
            "Hasła muszą być takie same",
        }}
      ></GowiFormInput>
      <GowiButton
        type={signInForm.formState.isValid ? "primary" : "disabled"}
        isDisabled={!signInForm.formState.isValid}
        onPress={signInForm.handleSubmit(signUp)}
        title={t("buttons.Register")}
      ></GowiButton>
      <GowiButton
        title={t("restorePasswordTexts.Return to login")}
        textOnly
        onPress={() => router.push("/(auth)/LoginPage")}
      ></GowiButton>
    </GowiSafeArea>
  );
}
