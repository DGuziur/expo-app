import { router, Stack } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ marginRight: 10 }}>{"User"}</Text>
              <Image
                source={{ uri: "https://i.pravatar.cc/40" }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 50,
                }}
              ></Image>
            </View>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "powderblue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Units",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
    </Stack>
  );
}
