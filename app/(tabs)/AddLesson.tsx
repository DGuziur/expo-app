import PrimaryButton from "@/components/PrimaryButton";
import { StyleSheet, View } from "react-native";

export default function AddLesson() {
  return (
    <View style={styles.container}>
     <PrimaryButton
       title="Primary Button L"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="L"
          />
     <PrimaryButton
       title="Primary Button S"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="S"
          />
      <PrimaryButton
       title="Primary Button L gray"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="L"
        gray
          />
     <PrimaryButton
       title="Primary Button S gray"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="S"
        gray
          />
      <PrimaryButton
       title="Primary Button L violet"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="L"
        violet
          />
     <PrimaryButton
       title="Primary Button S violet"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="S"
        violet
          />
      <PrimaryButton
       title="Primary Button textOnly"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="L"
        textOnly
          />
      <PrimaryButton
       title="Primary Button textOnly underline"
        onPress={() => console.log("click")}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        size="L"
        textOnly
        underline
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d0f3cff",
    gap: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
