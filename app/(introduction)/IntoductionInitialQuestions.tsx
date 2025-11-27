import GowiButton from "@/components/GowiButton";
import ProgressStages from "@/components/ProgressStages";
import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import HumanSvg from "@assets/icons/human.svg";
import { useState } from "react";
import { Text, View } from "react-native";

export default function NewUserQuestions() {
  const theme = useTheme();
  const totalStages = 8;
  const [progressState, setProgressState] = useState(0);
  return (
    <>
      <ProgressStages
        total={totalStages}
        current={progressState}
        onBackBtnPress={() =>
          setProgressState((state) => (state > 0 ? state - 1 : 0))
        }
      ></ProgressStages>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            ...theme.fonts.primary.semiBold,
            fontSize: 19,
            color: themeColors.textDarkMode.textSecondary,
          }}
        >
          CIAŁO I ENERGIA
        </Text>
        <HumanSvg></HumanSvg>
        <Text
          style={{
            ...theme.fonts.primary.bold,
            fontSize: 22,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            paddingVertical: 40,
          }}
        >
          Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień.
        </Text>
        <Text
          style={{
            ...theme.fonts.primary.regular,
            fontSize: 16,
            color: themeColors.textDarkMode.textPrimary,
            textAlign: "center",
            paddingVertical: 40,
          }}
        >
          W jakim stopniu dotyczy to ciebie? (0-5)
        </Text>
        <View style={{ gap: 10 }}>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="0 → zupełnie się nie zgadzam"
            type="secondary"
            onPress={() =>
              setProgressState((state) =>
                state < totalStages ? state + 1 : totalStages
              )
            }
          ></GowiButton>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="1 → nie zgadzam się"
            type="secondary"
          ></GowiButton>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="2 → trochę się nie zgadzam"
            type="secondary"
          ></GowiButton>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="3 → trochę się zgadzam"
            type="secondary"
          ></GowiButton>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="4 → zgadzam się"
            type="secondary"
          ></GowiButton>
          <GowiButton
            textStyles={{ width: "100%" }}
            title="5 → całkowicie się zgadzam"
            type="secondary"
          ></GowiButton>
        </View>
      </View>
    </>
  );
}
