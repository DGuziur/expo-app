import { styles } from "@/assets/styles/auth.styles";
import GowiButton from "@/components/GowiButton";
import { auth } from "@/firebaseInit";
import GowiFormInput from "@/lib/GowiFormInput";
import { useTheme } from "@/themes/ThemeProvider";
import { getAuthErrorNamePl } from "@/utils/errors/firebaseAuth";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const loginForm = useForm({
    delayError: 3000,
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async (formData: LoginForm) => {
    await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).catch((err: FirebaseError) => {
      loginForm.reset();
      setFirebaseError(getAuthErrorNamePl(err.code));
    });
  };

  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background, flex: 1 , }]}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1318764563/vector/various-emotions-and-facial-expressions-of-one-person.webp?a=1&b=1&s=612x612&w=0&k=20&c=dOhYx052PU4Epnjj3Uh8xx16h0XqoN1kdYVqFf_YN1o=",
        }}
        style={{
          width: "80%",
          maxWidth: 300,
          aspectRatio: 16 / 9,
          marginBottom: 50,
        }}
      />
      {firebaseError && <Text style={styles.errorText}>{firebaseError}</Text>}

      <GowiFormInput
        control={loginForm.control}
        controlName="email"
        label="Email"
        placeholder="Email"
        keyboardType={"email-address"}
        customStyles={{ width: "80%", maxWidth: 300 }}
        rules={{
          required: "Email is required",
        }}
      ></GowiFormInput>
      <GowiFormInput
        control={loginForm.control}
        controlName="password"
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        customStyles={{ width: "80%", maxWidth: 300 }}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password has to be at least 6 characters long",
          },
        }}
      ></GowiFormInput>
      <GowiButton
        title="Sign In"
        size="L"
        onPress={loginForm.handleSubmit(signIn)}
      ></GowiButton>
      <TouchableOpacity onPress={() => router.push("/(auth)/SignUpPage")}>
        <Text>Dont have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
