import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LessonForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text>Tytuł lekcji</Text>
        <Controller
          control={control}
          name="title"
          rules={{
            required: "This field is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter title here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text>{errors.title?.message}</Text>}
        <Text>Opis lekcji</Text>
        <Controller
          control={control}
          name="desc"
          rules={{
            required: "This field is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter description here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text>{errors.desc?.message}</Text>
        <Text>Dodaj zadania: </Text>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02071b67",
    position: "relative",
  },
  form: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
  },
});
