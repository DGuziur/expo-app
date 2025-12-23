import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import AppleSVG from "@assets/icons/apple.svg";
import RightArrow from "@assets/icons/ArrowRight.svg";
import FacebookSVG from "@assets/icons/facebook.svg";
import GoogleSVG from "@assets/icons/google.svg";
import GowiButterflyImg from "@assets/images/gowiButterfly.png";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

export default function CreateAccountAfterIntroQuestions() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <GowiSafeArea
      contentContainerStyle={{
        padding: 30,
        justifyContent: "space-between",
      }}
    >
      <GowiHeader
        content={t("introductionTexts.Start your journey")}
      ></GowiHeader>
      <View style={{ gap: 40 }}>
        <Image
          style={{ width: 145, height: 135, alignSelf: "center" }}
          source={GowiButterflyImg}
        ></Image>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            color: themeColors.textDarkMode.textSecondary,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {t(
            "introductionTexts.Create an account to monitor your development and match the path to yourself"
          )}
        </Text>
        <GowiButton
          title={
            <Text style={{ justifyContent: "center", alignItems: "center" }}>
              {t("buttons.Register")} <RightArrow height={10}></RightArrow>
            </Text>
          }
          type="primary"
          onPress={() => router.back()}
        ></GowiButton>
      </View>

      <View style={{ gap: 24 }}>
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
    </GowiSafeArea>
  );
}
