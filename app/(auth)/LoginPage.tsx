import { styles } from "@/assets/styles/auth.styles";
import { auth } from "@/firebaseInit";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch(
      (err: FirebaseError) => setLoginError(getAuthErrorNamePl(err.code))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1318764563/vector/various-emotions-and-facial-expressions-of-one-person.webp?a=1&b=1&s=612x612&w=0&k=20&c=dOhYx052PU4Epnjj3Uh8xx16h0XqoN1kdYVqFf_YN1o=",
        }}
        style={{ width: "50%", aspectRatio: 16 / 9, marginBottom: 50 }}
      />
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
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
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/SignUpPage")}>
        <Text>Dont have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
