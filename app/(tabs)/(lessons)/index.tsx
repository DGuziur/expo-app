import MiniMenu from "@/components/MiniMenu";
import GowiButton from "@/lib/GowiButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Unit } from "@/types/types";
export default function Lessons() {
  const [editMode, setEditMode] = useState(false);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | number | null>(
    null
  );
  let counter = 0;

  const waitForCourse = async () => {
    const awaitedCourse = await AsyncStorage.getItem("Units");
    if (awaitedCourse === null) {
      return <Redirect href={"/(tabs)/(modules)/index"} />;
    }
    setAllUnits(JSON.parse(awaitedCourse));
  };

  waitForCourse();

  function handleEditLesson(
    lessonId: number | string,
    lessonTitle: string,
    unitId: string | number
  ) {
    //console.log("edit: ", lessonId, " title: ", lessonTitle);
    router.push({
      pathname: "/(tabs)/(lessons)/FormLesson",
      params: {
        sendedLessonName: lessonTitle,
        lessonId: lessonId,
        unitId: unitId,
      },
    });
  }

  function handleDeleteLesson(
    lessonId: number | string,
    indexUnit: number,
    lessonTitle: string
  ) {
    Alert.alert(
      "Potwierdzenie",
      `Czy na pewno chcesz usunąć tę lekcję? ${lessonTitle}`,
      [
        {
          text: "Anuluj",
          style: "cancel",
        },
        {
          text: "Usuń",
          style: "destructive",
          onPress: () => {
            const unit = allUnits[indexUnit];
            unit.lessons = unit.lessons.filter(
              (lesson) => lessonId !== lesson.id
            );
            Alert.alert("Usunięto lekcję", lessonTitle);
            setActiveMenuId(null);
          },
        },
      ]
    );
  }

  function whereItemGo(i: any) {
    const options = ["center", "flex-end", "center", "flex-start"];
    return options[i % options.length];
  }

  function getFlowerTransform(indexUnit: number) {
    const isEven = indexUnit % 2 === 0;
    const translateX = isEven ? 250 : -10;
    const translateY = isEven ? 90 : -30;
    const rotate = isEven ? "-30deg" : "30deg";

    return [{ translateX }, { translateY }, { rotate }];
  }

  function openLessonForm(unitId: string) {
    // console.log("openLessonForm wywołane!", unitId);
    router.push({
      pathname: "/(tabs)/(lessons)/FormLesson",
      params: { unitId: unitId },
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/600/300",
        }}
      />

      <GowiButton
        customStyles={editMode ? styles.editBtnChecked : styles.editBtn}
        handleBtnPress={() => setEditMode(!editMode)}
        buttonText={
          editMode
            ? `Wyłącz tryb edycji  ${String.fromCharCode(10006)}`
            : `Włącz tryb edycji  ${String.fromCharCode(128397)}`
        }
        buttonTextStyle={!editMode && styles.buttonText}
      />

      {allUnits.map((unit, indexUnit) => {
        const lessonPositions = unit.lessons.map((_, i) => {
          counter++;
          return whereItemGo(counter - 1);
        });
        const lessonsLength = unit.lessons.length;
        return (
          <View key={unit.id}>
            <View style={styles.header}>
              <Text style={styles.courseTitle}>{unit.title}</Text>
              <Text style={styles.lessonsCount}>
                {unit.lessons.length} lekcji
              </Text>
            </View>
            <View style={styles.timelineContainer}>
              <Image
                style={[
                  styles.fleur,
                  {
                    transform: getFlowerTransform(indexUnit),
                  },
                ]}
                source={require("../../../assets/images/gowi1.png")}
              />
              {unit.lessons.map((lesson, i) => {
                const placeHere: any = lessonPositions[i];
                const nextPlacement: any = lessonPositions[i + 1];

                return (
                  <View key={lesson.id} style={styles.lessonRow}>
                    {editMode && (
                      <MiniMenu
                        placeHere={placeHere}
                        isActive={activeMenuId === lesson.id}
                        onToggle={(id) => {
                          setActiveMenuId(activeMenuId === id ? null : id);
                          //console.log(id);
                        }}
                        index={lesson.id}
                        onEdit={() =>
                          handleEditLesson(
                            lesson.id,
                            lesson.lessonTitle,
                            unit.id
                          )
                        }
                        onDelete={() =>
                          handleDeleteLesson(
                            lesson.id,
                            indexUnit,
                            lesson.lessonTitle
                          )
                        }
                      />
                    )}

                    <TouchableOpacity
                      style={[styles.lessonCircle, { alignSelf: placeHere }]}
                    >
                      <Text style={styles.lessonNumber}>{i + 1}</Text>
                    </TouchableOpacity>

                    {i < lessonsLength - 1 && (
                      <View style={styles.connection}>
                        <View
                          style={[
                            styles.connectionDot,
                            { alignSelf: nextPlacement },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                );
              })}

              {editMode && (
                <TouchableOpacity
                  style={styles.addLessonBTN}
                  onPress={() => openLessonForm(unit.id)}
                >
                  <Text style={styles.addLessonBtnText}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      <View style={styles.finish}>
        <Text style={styles.finishText}>FINI!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b39b109",
  },
  image: {
    height: 200,
    objectFit: "cover",
    width: "100%",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0a041aff",
    marginBottom: 5,
  },
  lessonsCount: {
    fontSize: 16,
    color: "#636e72",
  },
  timelineContainer: {
    paddingHorizontal: 120,
    paddingVertical: 10,
    position: "relative",
  },
  lessonRow: {
    position: "relative",
    marginBottom: 10,
  },
  lessonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "powderblue",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: "#13145fff",
    borderBottomWidth: 7,
    borderWidth: 1,
    borderColor: "#aabcd6ff",
  },
  lessonNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  connection: {
    height: 30,
    justifyContent: "space-between",
  },
  connectionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#74b9ff",
    marginHorizontal: 10,
  },
  finish: {
    padding: 15,
    margin: 20,
    marginBottom: 40,
    backgroundColor: "pink",
    borderRadius: 10,
    alignItems: "center",
  },
  finishText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fleur: {
    position: "absolute",
    width: 100,
    height: 100,
    top: "50%",
    left: "50%",
    marginLeft: -50,
    marginTop: -50,
    objectFit: "contain",
  },
  addLessonBTN: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#b811853a",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 7,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.52)",
    shadowColor: "#041f35ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addLessonBtnText: {
    color: "#c503c5ff",
  },
  editBtn: {
    backgroundColor: "#ecececff",
    width: "100%",
    marginTop: 1,
    borderTopColor: "#8a3de2ff",
    borderTopWidth: 2,
  },
  buttonText: { color: "#8a3de2ff" },
  editBtnChecked: {
    width: "100%",
    marginTop: 1,
  },
});
