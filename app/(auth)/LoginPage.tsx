import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import AppleSVG from "@assets/icons/apple.svg";
import ArrowRight from "@assets/icons/ArrowRight.svg";
import FacebookSVG from "@assets/icons/facebook.svg";
import GoogleSVG from "@assets/icons/google.svg";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";

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
    <GowiSafeArea
      contentContainerStyle={{
        justifyContent: "space-between",
        padding: 30,
        width: Dimensions.get("screen").width,
      }}
    >
      <GowiHeader
        overrideBack={() => router.replace("/(auth)")}
        content={t("loginTexts.Welcome back!")}
      ></GowiHeader>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            fontSize: 18,
            color: theme.textDarkMode.textPrimary,
            marginBottom: 30,
            textAlign: "center",
          }}
        ></Text>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            fontSize: 16,
            textAlign: "center",
            color: theme.textDarkMode.textPrimary,
            marginBottom: 30,
          }}
        >
          {t("loginTexts.Log in to continue your journey with Gowi.")}
        </Text>
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
          customStyle={{ alignSelf: "flex-end" }}
          onPress={() => {
            router.push("/(auth)/SignUpPage");
          }}
        />
        <View
          style={{
            gap: 24,
            marginBottom: 48,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              ...theme.fonts.primary.regular,
              color: themeColors.textDarkMode.textSecondary,
              textAlign: "center",
            }}
          >
            {t("buttons.Or log in using")}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}
          >
            <AppleSVG height={32} width={32}></AppleSVG>
            <FacebookSVG height={32} width={32}></FacebookSVG>
            <GoogleSVG height={32} width={32}></GoogleSVG>
          </View>
        </View>
      </View>

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
