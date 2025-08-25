import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LessonForm() {
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
    Alert.alert("Dodano: ", JSON.stringify(data));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Formularz dodania Lekcji oraz zadań</Text>
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

        <Text>Dodaj zadanie</Text>
        <Text>Wybierz typ zadania</Text>
        <Text>lista...</Text>
        <Text>Polecenie</Text>
        <Text>Tresc</Text>

        <TouchableOpacity style={styles.submitBtn}>
          <Button title="submit" onPress={handleSubmit(submit)} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
  submitBtn: {
    marginTop: 18,
    width: "90%",
  },
  label: {
    marginTop: 18,
    fontWeight: "600",
    color: "#77077aff",
  },
});
