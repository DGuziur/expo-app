import { Unit } from "@/types/types";
import { course } from "../../data/data";

import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Lessons() {
  const [positions, setPositions] = useState<{ [id: string]: number }>({});
  const unit: Unit = course[0];

  function whereItemGo(i: any) {
    const options = ["center", "flex-end", "center", "flex-start"];
    return options[i % options.length];
  }
  const lessonPositions = unit.lessons.map((a, i) => whereItemGo(i));
  console.log(lessonPositions);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.shutterstock.com/image-photo/maldives-islands-ocean-tropical-beach-600nw-1938868960.jpg",
        }}
      />
      <View>
        {unit.lessons.map((a, i) => {
          const placeHere: any = lessonPositions[i];
          const nextPlacement: any = lessonPositions[i + 1];
          console.log(positions);

          return (
            <View key={a.id} style={styles.lessonsContainer}>
              <TouchableOpacity
                style={[styles.lesson, { alignSelf: placeHere }]}
              >
                <Text>{a.id}</Text>
              </TouchableOpacity>

              {i < unit.lessons.length - 1 && (
                <>
                  <Text style={[styles.dots, { alignSelf: placeHere }]}>•</Text>
                  <Text
                    style={[
                      styles.dots,
                      {
                        alignSelf: "center",
                        marginLeft:
                          placeHere === "center" && nextPlacement === "flex-end"
                            ? "46%"
                            : placeHere === "flex-end" &&
                              nextPlacement === "center"
                            ? "46%"
                            : "-0%",
                      },
                    ]}
                  >
                    •
                  </Text>
                  <Text style={[styles.dots, { alignSelf: nextPlacement }]}>
                    •
                  </Text>
                </>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.fini}>
        <Text style={{ textAlign: "center" }}>Fini</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
  },
  image: {
    height: 200,
    resizeMode: "stretch",
  },
  fini: {
    padding: 10,
    marginBottom: 30,
    backgroundColor: "orange",
  },
  lessonsContainer: {
    flexDirection: "column",
    marginBottom: 0,
    marginHorizontal: "20%",
  },
  lesson: {
    backgroundColor: "brown",
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 2,
    marginTop: 2,
    justifyContent: "center",
  },
  dots: {
    height: 20,
    width: 20,
    backgroundColor: "red",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    fontWeight: 600,
    marginHorizontal: 60,
    borderRadius: 10,
    color: "white",
  },
});
