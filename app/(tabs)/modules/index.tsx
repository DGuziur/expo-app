import { app } from "@/firebaseInit";
import { Unit } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore } from "@firebase/firestore";
import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course } from "../../../data/data";

export default function Index() {
  const router = useRouter();
  const db = getFirestore(app);

  const getModuleColor = (index: number) => {
    const colors = [
      "#58CC02",
      "#00B4D8",
      "#FF9F1C",
      "#E63946",
      "#9C89B8",
      "#F77F00",
    ];
    return colors[index % colors.length];
  };

  const getProgressWidth = (index: number) => {
    const progressValues = [100, 80, 60, 40, 20, 0];
    return progressValues[index % progressValues.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Twój kursik szmexy</Text>
        <Text style={styles.headerSubtitle}>Ucz się dzielnie!</Text>
        <Pressable
          onPress={() => router.push("/(tabs)/modules/add-module/AddModule")}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Dodaj</Text>
          <View
            style={{
              backgroundColor: "#00B4D8",
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add-outline" size={20} color={"white"}></Ionicons>
          </View>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {course.map((unit: Unit, index: number) => {
          const isCompleted = getProgressWidth(index) === 100;
          const isLocked = index > 2;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.moduleCard,
                {
                  backgroundColor: isLocked ? "#E5E5E5" : getModuleColor(index),
                  opacity: isLocked ? 0.6 : 1,
                },
              ]}
              disabled={isLocked}
              activeOpacity={0.8}
            >
              <View style={styles.moduleIcon}>
                <Text
                  style={[
                    styles.moduleNumber,
                    { color: isLocked ? "#999" : "white" },
                  ]}
                >
                  {index + 1}
                </Text>
              </View>

              <View style={styles.moduleContent}>
                <Text
                  style={[
                    styles.moduleTitle,
                    { color: isLocked ? "#999" : "white" },
                  ]}
                >
                  {unit.title}
                </Text>
                <Text
                  style={[
                    styles.moduleDesc,
                    { color: isLocked ? "#999" : "rgba(255,255,255,0.9)" },
                  ]}
                >
                  {unit.desc}
                </Text>

                {!isLocked && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${getProgressWidth(index)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {getProgressWidth(index)}%
                    </Text>
                  </View>
                )}

                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓ Ukończono</Text>
                  </View>
                )}

                {isLocked && (
                  <View style={styles.lockedBadge}>
                    <Text style={styles.lockedText}>🔒 Zablokowane</Text>
                  </View>
                )}
              </View>

              <View style={styles.moduleArrow}>
                <Text
                  style={[
                    styles.arrowText,
                    { color: isLocked ? "#999" : "white" },
                  ]}
                >
                  ›
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#777",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  moduleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  moduleNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  moduleDesc: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 3,
  },
  progressText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 35,
  },
  completedBadge: {
    marginTop: 8,
  },
  completedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  lockedBadge: {
    marginTop: 8,
  },
  lockedText: {
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
  },
  moduleArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 20,
  },
});
