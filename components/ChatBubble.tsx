import { themeColors } from "@/themes/themeColors";
import { useTheme } from "@/themes/ThemeProvider";
import ChatBubbleArrow from "@assets/icons/ChatBubbleArrow.svg";
import { Text, View } from "react-native";

interface ChatBubbleProps {
  text: string;
  direction?: "left" | "right";
}
export default function ChatBubble({
  text,
  direction = "left",
}: ChatBubbleProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: direction === "left" ? "row" : "row-reverse",
      }}
    >
      <ChatBubbleArrow
        style={{ transform: [{ scaleX: direction === "left" ? 1 : -1 }] }}
        width={16}
        height={24}
      ></ChatBubbleArrow>
      <View
        style={{
          padding: 10,
          borderRadius: 15,
          borderTopLeftRadius: direction === "left" ? 0 : 15,
          borderTopRightRadius: direction === "left" ? 15 : 0,
          backgroundColor: themeColors.neutralsDarkMode.surfaceElev,
          borderBottomWidth: 5,
          borderBottomColor: "#4C2B59",
        }}
      >
        <Text
          style={{
            ...theme.fonts.primary.regular,
            color: theme.textDarkMode.textPrimary,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
