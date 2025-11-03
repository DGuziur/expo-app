import { buttonsStyles } from "@/assets/styles/buttons";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";


type PrimaryButtonLProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  colors?: string[];
};

export default function PrimaryButtonL({ title, onPress, colors }:PrimaryButtonLProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["#FFE044", "#FF8C42", '#CA009E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[buttonsStyles.base, buttonsStyles.shadow]}
      >
        <Text style={buttonsStyles.text}>{title} -></Text>
      </LinearGradient> 
    </TouchableOpacity>
  );
}
