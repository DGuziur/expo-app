import app from "@/firebaseInit";
import { Unit } from "@/types/types";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course } from "../data/data";
export default function Index() {
  const router = useRouter();
  const db = getFirestore(app);

  return (
    <View style={styles.container}>
      <Text style={styles.popup}>Hej szmexy~</Text>
      <Text style={styles.popupClose}>&#10008;</Text>
      <View>
        <ScrollView>
          {course.map((a: Unit) => {
            return (
              <TouchableOpacity key={a.id}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{a.title}</Text>
                  <Text style={styles.cardDesc}>{a.desc}</Text>
                  <Text>{a.lessons?.length}</Text>
                  <Button
                    style={{ margin: 10 }}
                    onPress={() => {
                      router.push("./lessons/Lessons");
                    }}
                  >
                    Learn more
                  </Button>
                </View>
              </TouchableOpacity>
            );
          })}
          <Button
            onPress={() => {
              addDoc(collection(db, "Units"), {
                title: "Testowy Unit 1",
                desc: "To jest unit stworzony do testowania czy coś",
                lessons: [],
              });
            }}
          >
            Dodaj
          </Button>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F8F8" },
  popup: {
    backgroundColor: "pink",
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },
  popupClose: {
    position: "absolute",
    right: 15,
    top: 12,
    color: "white",
  },
  card: {
    flex: 1,
    height: 200,
    backgroundColor: "powderblue",
    marginBottom: 10,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(176, 224, 230, 0.99)",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "darkblue",
    marginBottom: 1.5,
  },
  cardDesc: {
    fontSize: 15,
    color: "darkblue",
    margin: "auto",
    marginBottom: 10,
    fontWeight: "bold",
    opacity: 0.6,
  },
});
