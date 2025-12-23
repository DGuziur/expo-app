import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { app, auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { useTheme } from "@/themes/ThemeProvider";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import ArrowRightSVG from "@assets/icons/ArrowRight.svg";
import { styles } from "@assets/styles/auth.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

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
    const [selectedAreasOfImprovement, onboardingAnswers] = await Promise.all([
      AsyncStorage.getItem("OnboSelectedAreas"),
      AsyncStorage.getItem("onboardingQuestions"),
    ]);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).catch((err: FirebaseError) =>
      setLoginError(getAuthErrorNamePl(err.code))
    );
    if (!userCredential) return router.replace("/(auth)");

    const userRef = doc(db, "Users", userCredential.user.uid);

    await setDoc(userRef, {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      selectedAreasOfImprovement: selectedAreasOfImprovement,
      createdAt: serverTimestamp(),
    });

    const todayISO = new Date().toISOString().slice(0, 10);
    await setDoc(doc(userRef, "wellbeingSurveys", todayISO), {
      date: todayISO,
      questions: onboardingAnswers,
      submittedAt: serverTimestamp(),
    });
    router.replace("/(auth)");
  };

  return (
    <GowiSafeArea
      contentContainerStyle={{ padding: 30, justifyContent: "space-between" }}
    >
      <GowiHeader
        content={
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
        }
      ></GowiHeader>
      <View style={{ gap: 45 }}>
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
        <View
          style={{
            width: 295,
            marginHorizontal: "auto",
          }}
        >
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
          {loginError && (
            <Text style={styles.errorText}>
              <ArrowRightSVG height={10} color={"red"}></ArrowRightSVG>{" "}
              {loginError}
            </Text>
          )}
        </View>
      </View>

      <GowiButton
        type={signInForm.formState.isValid ? "primary" : "disabled"}
        isDisabled={!signInForm.formState.isValid}
        onPress={signInForm.handleSubmit(signUp)}
        title={t("buttons.Register")}
      ></GowiButton>

      {/* <GowiButton
        title={t("restorePasswordTexts.Return to login")}
        textOnly
        onPress={() => router.push("/(auth)/LoginPage")}
      ></GowiButton> */}
    </GowiSafeArea>
  );
}
