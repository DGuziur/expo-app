import { Stack } from "expo-router";

export default function LessonsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="form/FormLesson" options={{ title: "Add Lesson" }} />
    </Stack>
  );
}
