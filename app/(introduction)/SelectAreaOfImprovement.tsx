import { useAuth } from "@/AuthContext";
import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { IMPROVEMENT_CATEGORIES } from "@/data/wellbeingCategories";
import { app } from "@/firebaseInit";
import { useTheme } from "@/themes/ThemeProvider";
import { themeColors } from "@/themes/themeColors";
import ArrowRightSVG from "@assets/icons/ArrowRight.svg";
import CheckSVG from "@assets/icons/Check.svg";
import DiceSVG from "@assets/icons/Dice.svg";
import { doc, getFirestore, updateDoc } from "@firebase/firestore";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SelectAreaOfImprovement() {
  const { t } = useTranslation();
  const db = getFirestore(app);
  const { user } = useAuth();
  const theme = useTheme();
  const [categories, setCategories] = useState(
    IMPROVEMENT_CATEGORIES.map((category) => ({
      title: category,
      isSelected: false,
    }))
  );

  const isAnySelected = categories.some((category) => category.isSelected);

  const toggleCategory = (indexToToggle: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category, index) =>
        index === indexToToggle
          ? { ...category, isSelected: !category.isSelected }
          : category
      )
    );
  };

  const selectRandomCategory = () => {
    const unselectedCategories = categories.filter(
      (category) => !category.isSelected
    );

    if (unselectedCategories.length === 0) {
      return;
    }

    const randomIndexInUnselected = Math.floor(
      Math.random() * unselectedCategories.length
    );
    const categoryToSelectTitle =
      unselectedCategories[randomIndexInUnselected].title;

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.title === categoryToSelectTitle
          ? { ...category, isSelected: true }
          : category
      )
    );
  };

  const handleSubmit = async () => {
    if (!user) return;
    const selectedCategories = categories.filter(
      (category) => category.isSelected
    );
    const selectedCategoriesToSend = selectedCategories.map(
      (category) => category.title
    );
    await updateDoc(doc(db, "Users", user.uid), {
      seletedAreasOfImprovement: selectedCategoriesToSend,
    });

    router.replace("/(tabs)/(modules)");
  };

  return (
    <GowiSafeArea
      scrollable={false}
      contentContainerStyle={{ maxHeight: "100%", padding: 15 }}
    >
      <GowiHeader
        content={<Text> {t("introductionTexts.This is the last step")}🌿</Text>}
      ></GowiHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingBottom: 15,
        }}
      >
        <ChatBubble
          text={t(
            "introductionTexts.Choose the areas you want to discover first. Take into account your GROWWEB results - they may suggest where it is worth starting"
          )}
        ></ChatBubble>
        <ChatBubble
          text={t(
            "introductionTexts.All other topics will be waiting for you. You don't lose anything"
          )}
        ></ChatBubble>

        {categories.map(
          (category: { title: string; isSelected: boolean }, index: number) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 35,
                }}
                key={index}
              >
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: -7,
                      borderRadius: 30,
                      backgroundColor: themeColors.primary[800],
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => toggleCategory(index)}
                    style={{
                      padding: 10,
                      borderRadius: 30,
                      backgroundColor: category.isSelected
                        ? themeColors.primary[100]
                        : themeColors.primary[900],
                    }}
                  >
                    <Text
                      style={{
                        color: category.isSelected
                          ? themeColors.textDarkMode.textInverted
                          : themeColors.textDarkMode.textPrimary,
                        textAlign: "center",
                        fontSize: 16,
                        verticalAlign: "middle",
                        ...theme.fonts.primary.bold,
                      }}
                    >
                      {t(`improvementCategory.${category.title}`)}
                    </Text>
                  </TouchableOpacity>
                </View>
                {category.isSelected && (
                  <CheckSVG
                    style={{ position: "absolute", right: -32 }}
                    height={32}
                    width={32}
                  ></CheckSVG>
                )}
              </View>
            );
          }
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "stretch",
          paddingHorizontal: 15,
        }}
      >
        <GowiButton
          type="primary"
          textOnly
          underline
          onPress={selectRandomCategory}
          title={
            <Text>
              {t("buttons.Random")}
              <DiceSVG></DiceSVG>
            </Text>
          }
        ></GowiButton>

        {isAnySelected && (
          <GowiButton
            title={<ArrowRightSVG></ArrowRightSVG>}
            square
            type="primary"
            onPress={handleSubmit}
          ></GowiButton>
        )}
      </View>
    </GowiSafeArea>
  );
}
