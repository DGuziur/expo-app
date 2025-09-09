import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsOverlay() {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
          Settings overlay
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          <Text>Zamknij</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    height: "33%",
    backgroundColor: "#922929",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});
