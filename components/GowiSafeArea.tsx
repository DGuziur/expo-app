import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface GowiSafeScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function GowiSafeArea({
  children,
  scrollable = true,
  containerStyle,
  contentContainerStyle,
}: GowiSafeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        containerStyle,
      ]}
    >
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          scrollEnabled={scrollable}
          contentContainerStyle={[
            {
              flexGrow: 1,
              justifyContent: "center",
              paddingBottom: Math.max(insets.bottom, 16),
            },
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
