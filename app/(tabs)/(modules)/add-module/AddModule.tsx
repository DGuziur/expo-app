import { app } from "@/firebaseInit";
import { router } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
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

export default function AddModule() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const db = getFirestore(app);
  const addNewModule = async (formData: ModuleFormData) => {
    setIsLoading(true);
    const newModuleData = { ...formData, lessons: [] };
    const newDocRef = await addDoc(collection(db, "Units"), newModuleData);
    const orderDoc = await getDoc(doc(db, "Config", "UnitsOrder"));
    const currentOrder = orderDoc.exists() ? orderDoc.data().order : [];
    await setDoc(doc(db, "Config", "UnitsOrder"), {
      order: [...currentOrder, newDocRef.id],
    });

    router.back();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
    },
    mode: "onChange",
  });

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Dodaj nowy Moduł</Text>

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
        onPress={handleSubmit(addNewModule)}
        style={[style.button, !isValid && style.buttonDisabled]}
        disabled={!isValid || isLoading}
      >
        <Text style={style.buttonText}>Dodaj</Text>
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
  title: {
    padding: 15,
    fontSize: 36,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    width: 300,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
