import { Unit } from "@/types/types";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course } from "../../data/data";

export default function Lessons() {
  let counter = 0;
  const allUnits: Unit[] = course;

  function whereItemGo(i: any) {
    const options = ["center", "flex-end", "center", "flex-start"];
    return options[i % options.length];
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/600/300",
        }}
      />
      <Image
        style={styles.kwiatek}
        source={require("../../assets/images/flower1.png")}
      />
      {allUnits.map((unit) => {
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
              {unit.lessons.map((lesson, i) => {
                const placeHere: any = lessonPositions[i];
                const nextPlacement: any = lessonPositions[i + 1];

                return (
                  <View key={lesson.id} style={styles.lessonRow}>
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
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  lessonRow: {
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
  kwiatek: {
    position: "absolute",
    top: 350,
    left: 10,
    objectFit: "cover",
    width: 150,
    height: 160,
    aspectRatio: 1 / 1,
  },
});
