import PrimaryButtonL from "@/components/PrimaryButtonL";
import { StyleSheet, View } from "react-native";

export default function AddLesson() {
  return (
    <View style={styles.container}>
     <PrimaryButtonL
       title="Zapisz"
        onPress={() => console.log("click")}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
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
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
