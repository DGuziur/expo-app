import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Unit } from "@/types/types";
import { course } from "../../../data/data";

export default function LessonForm() {
  const allUnits: Unit[] = course;
  const { unitId } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessonName: "",
      lessonDesc: "",
    },
  });

  type FormData = {
    lessonName: string;
    lessonDesc: string;
  };
  const submit = (data: FormData) => {
    console.log(data);

    const addToThisUnit = allUnits.find((unit) => unit.id === unitId);
    if (addToThisUnit) {
      addToThisUnit.lessons.push(data);
      console.log("Dodano do unitu o ID: ", unitId, " Dane: ", data);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/(tabs)/(lessons)")}
        >
          <Text>Anuluj - wróć do zakładki lekcji</Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          Formularz dodania Lekcji oraz zadań dla modułu {unitId}
        </Text>
        <Text style={styles.label}>Nazwa Lekcji</Text>
        <Controller
          name="lessonName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Wpisz nazwę lekcji"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          rules={{ required: true }}
        />
        {errors.lessonName && (
          <Text style={styles.errorText}>Nazwa dla lekcji jest wymagana</Text>
        )}

        <Text style={styles.label}>Opis dla Lekcji</Text>
        <Controller
          name="lessonDesc"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Wpisz opis dla lekcji"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.lessonDesc && <Text style={styles.errorText}>Błąd</Text>}

        <Text style={styles.header}>Dodaj zadanie</Text>
        <Text>Wybierz typ zadania</Text>
        <Text>lista...</Text>
        <Text>Polecenie</Text>
        <Text>Tresc</Text>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(submit)}
        >
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const baseBTN: any = {
  padding: 10,
  borderRadius: 10,
  backgroundColor: "#74b9ff",
  alignItems: "center",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f567",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    marginTop: 5,
    borderColor: "gray",
  },
  errorText: {
    color: "red",
  },

  label: {
    marginTop: 18,
    fontWeight: "600",
    color: "#77077aff",
  },
  header: {
    marginTop: 18,
    textAlign: "center",
  },

  backBtn: {
    ...baseBTN,
    margin: 5,
    width: "90%",
  },
  submitBtn: {
    ...baseBTN,
    marginTop: 18,
    width: "90%",
  },
});
