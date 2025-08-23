import { StyleSheet, Text, View } from "react-native";

export default function AddLesson() {
  return (
    <View style={styles.container}>
      <Text>KUPA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#723333ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
