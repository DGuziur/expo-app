import app from "@/firebaseInit";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
    } catch (err) {
      console.log("SignIn failed: ", err);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
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
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/SignUpPage")}>
        <Text>Dont have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
});
