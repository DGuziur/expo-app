import { Platform, StyleSheet } from "react-native";

export const buttonsStyles = StyleSheet.create({
  base_L: {
    minWidth: 100,
    maxWidth: 327,
    height: 56,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  //  borderBottomColor: '#B34602',
    borderBottomWidth: 5,
  },
    base_S: {
    minWidth: 100,
    maxWidth: 327,
    height: 40,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
   // borderBottomColor: '#B34602',
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
        elevation: 1,
        shadowColor: "#DF4F58",
      },
      web: {
        boxShadow: "0px -5px 10px rgba(223, 79, 88, 0.8)",
      },
    }),
  },

  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
