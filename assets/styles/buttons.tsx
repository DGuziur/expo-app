import { Platform, StyleSheet } from "react-native";

export const buttonsStyles = StyleSheet.create({
  base: {
    minWidth: 100,
    maxWidth: 327,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: '#B34602',
    borderBottomWidth: 5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#DF4F58",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: "#DF4F58",
      },
    }),
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
