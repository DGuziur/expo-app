import Spinner from "@/components/Spinner";
import { app } from "@/firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const { newUnit, updatedUnit } = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [units, setUnits] = useState<UnitData[]>([]);
  const [selectedForSwap, setSelectedForSwap] = useState<number | null>(null);
  const router = useRouter();
  const db = getFirestore(app);

  const getUnits = async () => {
    const [orderDoc, savedOrder, savedUnits] = await Promise.all([
      getDoc(doc(db, "Config", "UnitsOrder")),
      AsyncStorage.getItem("UnitsOrder"),
      AsyncStorage.getItem("Units"),
    ]);

    if (!orderDoc.exists()) return handleMissingOrderDoc();

    if (!savedOrder || !savedUnits)
      return getFreshUnits(orderDoc.data().order as string[]);

    if (JSON.stringify(orderDoc.data().order) === savedOrder)
      return loadCached(JSON.parse(savedUnits));

    return getFreshUnits(orderDoc.data().order as string[]);
  };

  const getFreshUnits = async (idOrder: string[]) => {
    const snapshot = await getDocs(query(collection(db, "Units")));
    const units: UnitData[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FirestoreUnitData),
    }));

    const sortedUnits = idOrder
      .map((id) => units.find((unit: UnitData) => unit.id === id))
      .filter(Boolean) as UnitData[];

    await Promise.all([
      AsyncStorage.setItem("UnitsOrder", JSON.stringify(idOrder)),
      AsyncStorage.setItem("Units", JSON.stringify(sortedUnits)),
    ]);

    alert(`Got units from firebase, ${snapshot.docs.length} reads`);

    setUnits(sortedUnits);
    setLoading(false);
  };

  const handleMissingOrderDoc = async () => {
    const allUnitsSnapshot = await getDocs(collection(db, "Units"));

    alert(
      `created missing order docs, ${allUnitsSnapshot.docs.length} reads, 1 write`
    );

    if (allUnitsSnapshot.empty) {
      return setUnits([]);
    }

    const units = allUnitsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FirestoreUnitData),
    }));
    const unitIds = units.map((unit) => unit.id);

    await Promise.all([
      setDoc(doc(db, "Config", "UnitsOrder"), unitIds),
      AsyncStorage.setItem("UnitsOrder", JSON.stringify(unitIds)),
      AsyncStorage.setItem("Units", JSON.stringify(units)),
    ]);
    setUnits(units);
    setLoading(false);
  };

  const loadCached = (savedUnits: UnitData[]) => {
    alert("loaded cached :> 0 reads");
    setUnits(savedUnits);
    setLoading(false);
  };

  const swapUnits = async (fromIndex: number, toIndex: number) => {
    try {
      const newUnits = [...units];
      [newUnits[fromIndex], newUnits[toIndex]] = [
        newUnits[toIndex],
        newUnits[fromIndex],
      ];
      setUnits(newUnits);

      const newOrder = newUnits.map((unit) => unit.id);

      await Promise.all([
        setDoc(doc(db, "Config", "UnitsOrder"), {
          order: newOrder,
          updatedAt: new Date(),
        }),
        AsyncStorage.setItem("UnitsOrder", JSON.stringify(newOrder)),
        AsyncStorage.setItem("Units", JSON.stringify(newUnits)),
      ]);
    } catch (error) {
      await getUnits();
    } finally {
      setSelectedForSwap(null);
    }
    alert("1 write");
  };

  const deleteUnit = async (id: string) => {
    try {
      const newUnits = units.filter((unit) => unit.id !== id);
      setUnits(newUnits);

      const newOrder = newUnits.map((unit) => unit.id);

      await Promise.all([
        deleteDoc(doc(db, "Units", id)),
        setDoc(doc(db, "Config", "UnitsOrder"), {
          order: newOrder,
        }),
        AsyncStorage.setItem("UnitsOrder", JSON.stringify(newOrder)),
        AsyncStorage.setItem("Units", JSON.stringify(newUnits)),
      ]);
    } catch (error) {
      await getUnits();
    }
    alert("1 delete 1 write");
  };

  const addNewUnit = async (newUnit: string) => {
    const unit = JSON.parse(newUnit);

    try {
      const newUnitRef = doc(collection(db, "Units"));
      await runTransaction(db, async (transaction) => {
        const orderDocRef = doc(db, "Config", "UnitsOrder");
        const orderDoc = await transaction.get(orderDocRef);
        const currentOrder = orderDoc.exists() ? orderDoc.data().order : [];

        transaction.set(newUnitRef, unit);
        transaction.set(orderDocRef, {
          order: [...currentOrder, newUnitRef.id],
        });
      });

      const unitWithId = { ...unit, id: newUnitRef.id };
      setUnits((prev) => [...prev, unitWithId]);

      alert("created, you did 2 writes");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateUnit = async (unit: UnitData) => {
    try {
      await updateDoc(doc(db, "Units", unit.id), {
        title: unit.title,
        desc: unit.desc,
      });
      setUnits((prev) => prev.map((u) => (u.id === unit.id ? unit : u)));
      Promise.all([AsyncStorage.setItem("Units", JSON.stringify(units))]);

      alert("updated, you did 1 write");
    } catch (error) {
      console.error("Update failed:", error);
      await getUnits();
    }
  };

  useEffect(() => {
    if (newUnit) {
      addNewUnit(newUnit as string);
    }

    if (updatedUnit) {
      updateUnit(JSON.parse(updatedUnit as string));
    }
  }, [newUnit, updatedUnit]);

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
          onPress={() => router.push("/(tabs)/(modules)/add-module/AddModule")}
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
                    router.push({
                      pathname: "/(tabs)/(modules)/edit-module/EditModule",
                      params: { ...unit },
                    });
                  }}
                  style={styles.menuButton}
                >
                  <Ionicons name="pencil-outline" size={22} color="darkblue" />
                </Pressable>

                <Pressable
                  onPress={() => {
                    selectedForSwap === null
                      ? setSelectedForSwap(index)
                      : swapUnits(selectedForSwap, index);
                  }}
                  style={[
                    styles.menuButton,
                    selectedForSwap === index
                      ? { backgroundColor: "green" }
                      : null,
                  ]}
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
  switchMenuButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255,215,100,0.9)",
    justifyContent: "center",
    alignItems: "center",
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
