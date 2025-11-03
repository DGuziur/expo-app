import PrimaryButton from "@/components/PrimaryButton";
import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddLesson() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.text}>Primary</Text>
      <View style={styles.grid}>
        <PrimaryButton title="Primary Button L" size="L" onPress={() => {}} />
        <PrimaryButton title="Primary Button S" size="S" onPress={() => {}} />
        <PrimaryButton title="Primary Button L gray" size="L" gray onPress={() => {}} />
        <PrimaryButton title="Primary Button S gray" size="S" gray onPress={() => {}} />
        <PrimaryButton title="Primary Button L violet" size="L" violet onPress={() => {}} />
        <PrimaryButton title="Primary Button S violet" size="S" violet onPress={() => {}} />
        <PrimaryButton title="Primary Button textOnly" size="L" textOnly onPress={() => {}} />
        <PrimaryButton title="Primary Button textOnly underline" size="L" textOnly underline onPress={() => {}} />
      </View>

      <Text style={styles.text}>Squery</Text>
      <View style={styles.grid}>
        <PrimaryButton title="1" size="L" square onPress={() => {}} />
        <PrimaryButton title="2" size="L" violet square onPress={() => {}} />
        <PrimaryButton title="3" size="L" gray square onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d0f3cff",
  },
  content: {
    alignItems: "center",
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    gap: 10,
    width: "90%",
  },
  text: {
    color: "#0ccb92ff",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
});
