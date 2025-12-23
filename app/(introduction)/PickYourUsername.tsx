import { useAuth } from "@/AuthContext";
import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiPickOption from "@/components/GowiPickOption";
import GowiSafeArea from "@/components/GowiSafeArea";
import { app, auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { useTheme } from "@/themes/ThemeProvider";
import { router } from "expo-router";
import { signOut, updateProfile } from "firebase/auth";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";

export default function PickUsernameScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, authUser } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const db = getFirestore(app);
  const usernameForm = useForm({
    delayError: 3000,
    mode: "onChange",
    defaultValues: {
      username: "",
      gender: "",
    },
  });

  const updateUsername = async (data: { username: string; gender: string }) => {
    if (!user || !authUser) {
      return router.replace("/(auth)/LoginPage");
    }

    setIsLoading(true);

    try {
      await updateProfile(authUser, {
        displayName: data.username,
      });

      const userDocRef = doc(db, "Users", user.uid);

      await updateDoc(userDocRef, {
        displayName: data.username,
        gender: data.gender,
        updatedAt: serverTimestamp(),
      });
    } finally {
      setIsLoading(false);
      router.replace("/(auth)/LoginPage");
    }
  };

  return (
    <GowiSafeArea
      contentContainerStyle={{
        padding: 30,
        justifyContent: "space-between",
        width: Dimensions.get("screen").width,
      }}
    >
      <GowiHeader
        overrideBack={() => signOut(auth)}
        content={t("formsInfo.Your name")}
      ></GowiHeader>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            fontSize: 16,
            textAlign: "center",
            color: theme.textDarkMode.textPrimary,
            paddingVertical: 80,
          }}
        >
          {t("introductionTexts.How should i call you")}
        </Text>
        <GowiFormInput
          placeholder={t("formsInfo.My name")}
          label={t("formsInfo.My name")}
          control={usernameForm.control}
          controlName="username"
          rules={{
            required: "To pole jest wymagane",
          }}
        ></GowiFormInput>
        <GowiPickOption
          control={usernameForm.control}
          controlName="gender"
          label={t("formsInfo.My gender")}
          rules={{
            required: "To pole jest wymagane",
          }}
        ></GowiPickOption>
      </View>
      <GowiButton
        isDisabled={!usernameForm.formState.isValid || isLoading}
        type={usernameForm.formState.isValid ? "primary" : "disabled"}
        title={t("createAccTexts.Create your account")}
        onPress={usernameForm.handleSubmit(updateUsername)}
      ></GowiButton>
    </GowiSafeArea>
  );
}
