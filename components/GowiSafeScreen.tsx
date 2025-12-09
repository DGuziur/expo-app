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

interface GowiScreenWrapperProps {
  children: ReactNode;
  scrollable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function GowiSafeScreen({
  children,
  scrollable = true,
  containerStyle,
  contentContainerStyle,
}: GowiScreenWrapperProps) {
  const insets = useSafeAreaInsets(); // Dodaj to

  return (
    <SafeAreaView style={[{ flex: 1 }, containerStyle]}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={[
              { flexGrow: 1, paddingBottom: Math.max(insets.bottom, 16) },
              contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
