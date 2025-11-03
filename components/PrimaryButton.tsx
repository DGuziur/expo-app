import { buttonsStyles } from "@/assets/styles/buttons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, ViewStyle } from "react-native";

type PrimaryButtonLProps = {
  title: string;
  onPress?: () => void;
  colors?: string[];
  pressedColors?: string[];
  size?: "L" | "S";
  gray?: boolean;
  violet?: boolean;
  textOnly?: boolean;
  underline?: boolean;
  square?: boolean;
};

export default function PrimaryButtonL({
  title,
  onPress,
  colors,
  pressedColors,
  size = "L",
  gray = false,
  violet = false,
  textOnly = false,
  underline = false,
  square = false,
}: PrimaryButtonLProps) {
  // const sizeStyle =
  //   size === "L" ? buttonsStyles.base_L : buttonsStyles.base_S;

  const sizeStyle = square
    ? { width: 56, height: 56, borderRadius: 12, alignItems: "center", justifyContent: "center" } as ViewStyle
    : size === "L"
    ? buttonsStyles.base_L
    : buttonsStyles.base_S;  

  const defaultColors = ["#FFE044", "#FF8C42", "#CA009E"];
  const defaultPressedColors = ["#FFA64A"];

  const grayColors = ["#666666"];
  const grayPressedColors = ["#404040"];

  const violetColors = ["#5A2292"];
  const violetPressedColors = ["#985FD2"];

  const activeColors = gray
    ? grayColors
    : violet
    ? violetColors
    : colors || defaultColors;

  const activePressedColors = gray
    ? grayPressedColors
    : violet
    ? violetPressedColors
    : pressedColors || defaultPressedColors;

  const borderColor = gray
    ? "#8A8A8A"
    : violet
    ? "#6A2AAB"
    : "#B34602";


  const shadowStyle = !gray && !violet ? buttonsStyles.shadow : null;  

  if (textOnly) {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <Text
            style={[
              buttonsStyles.text,
              { color: pressed ? "#abababff" : "#ffffffff" },
               { textDecorationLine: underline ? "underline" : "none" },
            ]}
          >
            {title} &#8594;
          </Text>
        )}
      </Pressable>
    );
  }


  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          colors={pressed ? activePressedColors : activeColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[sizeStyle, 
            shadowStyle, 
            {borderBottomColor: borderColor,
            borderBottomWidth: square ? 5 : 3,

            },
           ]}
        >
          <Text
            style={[
              buttonsStyles.text,
              gray && { color: "#8A8A8A" },
              { textDecorationLine: underline ? "underline" : "none" },
            ]}
          >
            {title} &#8594;
          </Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}
