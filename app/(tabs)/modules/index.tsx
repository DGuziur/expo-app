import Spinner from "@/components/Spinner";
import { app } from "@/firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
} from "@firebase/firestore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type UnitData = {
  id: string;
  title: string;
  desc: string;
};

type FirestoreUnitData = { title: string; desc: string };

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const [units, setUnits] = useState<UnitData[]>([]);
  const router = useRouter();
  const db = getFirestore(app);

  const getUnits = async () => {
    const snapshot = await getDocs(query(collection(db, "Units")));
    const unitsData: UnitData[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FirestoreUnitData),
    }));
    setUnits(unitsData);
    setLoading(false);
  };

  const deleteUnit = async (id: string) => {
    deleteDoc(doc(db, "Units", id));
    setUnits(units.filter((unit) => unit.id !== id));
  };

  useEffect(() => {
    getUnits();
  }, []);

  if (loading)
    return (
      <Spinner
        style={{ flex: 1 }}
        size={100}
        color="pink"
        strokeWidth={8}
      ></Spinner>
    );

  const getModuleColor = (index: number) => {
    const colors = ["powderblue", "pink"];
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
        <Pressable
          onPress={() => router.push("/(tabs)/modules/add-module/AddModule")}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "darkblue" }}>
            Dodaj
          </Text>
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
        {units.map((unit: UnitData, index: number) => {
          const isCompleted = getProgressWidth(index) === 100;
          const isLocked = false;

          return (
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/Lessons")}
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
              <View style={styles.menuContainer}>
                <Pressable
                  onPress={() => {
                    console.log("Edit unit:", unit.id);
                  }}
                  style={styles.menuButton}
                >
                  <Ionicons name="pencil-outline" size={22} color="darkblue" />
                </Pressable>

                <Pressable
                  onPress={() => {
                    console.log("Switch unit:", unit.id);
                  }}
                  style={styles.menuButton}
                >
                  <Ionicons
                    name="swap-horizontal-outline"
                    size={22}
                    color="darkblue"
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    deleteUnit(unit.id);
                  }}
                  style={styles.menuButton}
                >
                  <Ionicons name="trash-outline" size={22} color="darkblue" />
                </Pressable>
              </View>
              <View style={styles.moduleIcon}>
                <Text
                  style={[
                    styles.moduleNumber,
                    { color: isLocked ? "#999" : "darkblue" },
                  ]}
                >
                  {index + 1}
                </Text>
              </View>

              <View style={styles.moduleContent}>
                <Text
                  style={[
                    styles.moduleTitle,
                    { color: isLocked ? "#999" : "darkblue" },
                  ]}
                >
                  {unit.title}
                </Text>
                <Text
                  style={[
                    styles.moduleDesc,
                    { color: isLocked ? "#999" : "darkblue" },
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
                    { color: isLocked ? "#999" : "darkblue" },
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
  menuContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    gap: 8,
    zIndex: 1,
  },
  menuButton: {
    width: 30,
    height: 30,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "pink",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "darkblue",
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
    opacity: 0.8,
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
    color: "darkblue",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 35,
  },
  completedBadge: {
    marginTop: 8,
  },
  completedText: {
    color: "darkblue",
    fontSize: 12,
    fontWeight: "600",
  },
  lockedBadge: {
    marginTop: 8,
  },
  lockedText: {
    color: "darkblue",
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
