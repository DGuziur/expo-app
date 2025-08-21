import { styles } from "@/assets/styles/auth.styles";
import { auth } from "@/firebaseInit";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log("SignUp failed: ", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1318764563/vector/various-emotions-and-facial-expressions-of-one-person.webp?a=1&b=1&s=612x612&w=0&k=20&c=dOhYx052PU4Epnjj3Uh8xx16h0XqoN1kdYVqFf_YN1o=",
        }}
        style={{ width: "50%", aspectRatio: 16 / 9, marginBottom: 50 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={signUp}
        style={[styles.button, styles.secondaryButton]}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Create an account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/LoginPage")}>
        <Text>Back to login page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
