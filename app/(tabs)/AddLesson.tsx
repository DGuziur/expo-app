import GowiButton from "@/components/GowiButton";
import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddLesson() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.text}>Primary</Text>
      <View style={styles.grid}>
        <GowiButton title="Primary Button L" size="L" onPress={() => {}} />
        <GowiButton title="Primary Button S" size="S" onPress={() => {}} />
        <GowiButton title="Primary Button L gray" size="L" type="disabled" onPress={() => {}} />
        <GowiButton title="Primary Button S gray" size="S" type="disabled" onPress={() => {}} />
        <GowiButton title="Primary Button L violet" size="L" type="secondary" onPress={() => {}} />
        <GowiButton title="Primary Button S violet" size="S" type="secondary" onPress={() => {}} />
        <GowiButton title="Primary Button textOnly" size="L" textOnly onPress={() => {}} />
        <GowiButton title="Primary Button textOnly underline" size="L" textOnly underline onPress={() => {}} />
      </View>

      <Text style={styles.text}>Squery</Text>
      <View style={styles.grid}>
        <GowiButton title="1" size="L" square onPress={() => {}} />
        <GowiButton title="2" size="L" type="secondary" square onPress={() => {}} />
        <GowiButton title="3" size="L" type="disabled" square onPress={() => {}} />
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
