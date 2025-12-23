import ChatBubble from "@/components/ChatBubble";
import GowiButton from "@/components/GowiButton";
import GowiChip from "@/components/GowiChip";
import GowiHeader from "@/components/GowiHeader";
import GowiSafeArea from "@/components/GowiSafeArea";
import { IMPROVEMENT_CATEGORIES } from "@/data/wellbeingCategories";
import ArrowRightSVG from "@assets/icons/ArrowRight.svg";
import CheckSVG from "@assets/icons/Check.svg";
import DiceSVG from "@assets/icons/Dice.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function SelectAreaOfImprovement() {
  const { t } = useTranslation();
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
    const selectedCategories = categories.filter(
      (category) => category.isSelected
    );
    const selectedCategoriesToSend = selectedCategories.map(
      (category) => category.title
    );
    await AsyncStorage.setItem(
      "OnboSelectedAreas",
      JSON.stringify(selectedCategoriesToSend)
    );

    router.navigate("/CreateAccountAfterIntroQuestions");
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
                <GowiChip
                  isActive={category.isSelected}
                  variant="primary"
                  onPress={() => toggleCategory(index)}
                >
                  {t(`improvementCategory.${category.title}`)}
                </GowiChip>
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
