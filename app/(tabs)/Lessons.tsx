import { Unit } from "@/types/types";
import { course } from "../../data/data";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Lessons() {
  const unit: Unit = course[0];

  const amplitude = 50; // jak bardzo "faluje"
  const frequency = 1.5; // częstotliwość fali
  const spacing = 250; // odstęp w pionie
  const baseX = 100; // środek poziomej pozycji (bo sin może dać ujemne)

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.shutterstock.com/image-photo/maldives-islands-ocean-tropical-beach-600nw-1938868960.jpg",
        }}
      />

      <View style={styles.sinus}>
        {unit.lessons.map((a, i) => {
          const top = i * spacing;
          const left = baseX + Math.sin(i * frequency) * amplitude;

          return (
            <View key={a.id}>
              <TouchableOpacity style={[styles.lesson, { top, left }]}>
                <Text>{a.id}</Text>
              </TouchableOpacity>

              {i < unit.lessons.length - 1 &&
                [1, 2, 3].map((step) => {
                  const t = i + step / 4; // np. 1.25, 1.5, 1.75
                  const dotTop = t * spacing;
                  const dotLeft = baseX + Math.sin(t * frequency) * amplitude;

                  return (
                    <Text
                      key={`dot-${a.id}-${step}`}
                      style={[styles.dots, { top: dotTop, left: dotLeft }]}
                    >
                      ⋯
                    </Text>
                  );
                })}
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
  sinus: {
    position: "relative",
    height: 1000,
    marginTop: 20,
  },
  lesson: {
    position: "absolute",
    width: 150,
    height: 150,
    backgroundColor: "pink",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
  dots: {
    position: "absolute",
    fontSize: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "gray",
    opacity: 0.6,
    color: "white",
    textAlign: "center",
  },
});
