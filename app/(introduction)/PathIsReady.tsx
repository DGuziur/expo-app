import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import BackButtonSvg from "@assets/icons/BackArrow.svg";
import Gowi from "@assets/images/gowiButterfly.png";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroductionPathReady() {
  const theme = useTheme();
  const { t } = useTranslation();
  const onBackBtnPress = () => router.back();
  return (
    <SafeAreaView style={{ padding: 20, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <GowiButton
          square
          type="secondary"
          size="S"
          onPress={onBackBtnPress}
          title={<BackButtonSvg></BackButtonSvg>}
        ></GowiButton>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...theme.fonts.primary.bold,
              color: themeColors.textDarkMode.textPrimary,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {t("introductionTexts.The path is ready!")}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ChatBubble
          text={t(
            "introductionTexts.We will start with the topics you have chosen. MyGowi will guide you step by step"
          )}
        ></ChatBubble>
        <Image
          style={{ width: "70%", flex: 1 }}
          resizeMode={"contain"}
          source={Gowi}
        ></Image>
        <GowiButton
          type="primary"
          title={t("buttons.I am starting my journey")}
          onPress={() => router.replace("/(tabs)/(modules)")}
        ></GowiButton>
      </View>
    </SafeAreaView>
  );
}
