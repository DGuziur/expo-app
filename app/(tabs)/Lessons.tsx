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
  const [positions, setPositions] = useState([{}]);
  const unit: Unit = course[0];

  function whereItemGo() {
    const options = ["flex-start", "center", "flex-end"];
    return options[Math.floor(Math.random() * 3)];
  }

  const lessonPositions = unit.lessons.map(() => whereItemGo());

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

          return (
            <View key={a.id} style={styles.lessonsContainer}>
              <TouchableOpacity
                style={[styles.lesson, { alignSelf: placeHere }]}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  // console.log("height:", layout.height);
                  // console.log("width:", layout.width);
                  // console.log("x:", layout.x);
                  // console.log("y:", layout.y);
                  setPositions((prev) => ({
                    ...prev,
                    [a.id]: {
                      x: layout.x + layout.width / 2,
                      y: layout.y + layout.height / 2,
                    },
                  }));
                }}
              >
                <Text>{a.id}</Text>
              </TouchableOpacity>

              {i < unit.lessons.length - 1 && (
                <>
                  {/* {console.log("START ", placeHere, "NEXT ", nextPlacement)} */}
                  <View style={styles.dotContainer}>
                    <Text style={[styles.dots, { alignSelf: placeHere }]}>
                      •
                    </Text>
                  </View>
                  <View style={styles.dotContainer}>
                    <Text
                      style={[
                        styles.dots,
                        {
                          alignSelf:
                            placeHere === nextPlacement ? "center" : placeHere,
                        },
                      ]}
                    >
                      •
                    </Text>
                  </View>
                  <View style={styles.dotContainer}>
                    <Text style={[styles.dots, { alignSelf: nextPlacement }]}>
                      •
                    </Text>
                  </View>
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
    marginTop: 10,
    flex: 3,
    flexDirection: "column",
  },
  lesson: {
    margin: 1,
    backgroundColor: "brown",
    width: "30%",
    height: 30,
    borderRadius: 5,
  },
  dotContainer: {},
  dots: {
    fontSize: 30,
  },
});
