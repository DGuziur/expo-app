import { app } from "@/firebaseInit";
import { router, useLocalSearchParams } from "expo-router";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ModuleFormData = {
  title: string;
  desc: string;
};

export default function EditModule() {
  const { id, title, desc } = useLocalSearchParams<
    ModuleFormData & { id: string }
  >();
  const [isLoading, setIsLoading] = useState(false);

  const db = getFirestore(app);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ModuleFormData>({
    defaultValues: {
      title: title ?? "",
      desc: desc ?? "",
    },
    mode: "onChange",
  });

  const updateModule = async (formData: ModuleFormData) => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "Units", id), {
        title: formData.title,
        desc: formData.desc,
      });

      router.back();
      router.setParams({
        updatedUnit: JSON.stringify({ id, ...formData }),
      });
    } catch (error) {
      console.error("Błąd aktualizacji modułu:", error);
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Edytuj Moduł</Text>

      <View>
        <Text style={style.label}>Nazwa</Text>
        <Controller
          control={control}
          name="title"
          rules={{
            required: "Nazwa jest wymagana",
            minLength: {
              value: 3,
              message: "Nazwa musi mieć co najmniej 3 znaki",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nazwa"
              style={[style.input, errors.title && style.inputError]}
            />
          )}
        />
        {errors.title && (
          <Text style={style.errorText}>{errors.title.message}</Text>
        )}
      </View>

      <View>
        <Text style={style.label}>Opis</Text>
        <Controller
          control={control}
          name="desc"
          rules={{
            required: "Opis jest wymagany",
            minLength: {
              value: 3,
              message: "Opis musi mieć co najmniej 3 znaki",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Opis"
              multiline
              numberOfLines={4}
              style={[style.input, errors.desc && style.inputError]}
            />
          )}
        />
        {errors.desc && (
          <Text style={style.errorText}>{errors.desc.message}</Text>
        )}
      </View>

      <Pressable
        onPress={handleSubmit(updateModule)}
        style={[style.button, !isValid && style.buttonDisabled]}
        disabled={!isValid || isLoading}
      >
        <Text style={style.buttonText}>
          {isLoading ? "Zapisywanie..." : "Zapisz"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={style.button}>
        <Text style={style.buttonText}>Anuluj</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
  },
  title: { padding: 15, fontSize: 36 },
  label: { fontWeight: "bold", fontSize: 15, marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 300,
    fontSize: 16,
    marginBottom: 16,
  },
  inputError: { borderColor: "#FF3B30" },
  errorText: { color: "#FF3B30", fontSize: 12, marginBottom: 16 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    width: 300,
  },
  buttonDisabled: { backgroundColor: "#A0A0A0" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
