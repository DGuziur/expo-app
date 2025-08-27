import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

//
//        <GowiButton
//           customStyles={{ width: "90%" }}
//           buttonText={"KLIKNIJ TUTAJ"}
//           handleBtnPress={() => Alert.alert("do nothing")}
//         />

export default function GowiButton({
  buttonText,
  customStyles,
  handleBtnPress,
}: {
  buttonText: string;
  customStyles: StyleProp<ViewStyle>;
  handleBtnPress: (props: any) => any;
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, [customStyles]]}
      onPress={handleBtnPress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    paddingVertical: 13,
    borderRadius: 30,
    backgroundColor: "#8a3de2ff",
    alignItems: "center",
    alignSelf: "center",

    borderBottomColor: "#501594ff",
    borderBottomWidth: 2,

    borderRightColor: "#501594ff",
    borderRightWidth: 1,

    borderLeftColor: "#501594ff",
    borderLeftWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
