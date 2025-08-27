import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MiniMenuProps = {
  placeHere: any;
  isActive: boolean;
  onToggle: (index: number) => void;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

const MiniMenu: React.FC<MiniMenuProps> = ({
  placeHere,
  isActive,
  onToggle,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={[styles.miniMenuContainer, { alignSelf: placeHere }]}>
      <TouchableOpacity
        style={[styles.menuButton, isActive && styles.menuButtonActive]}
        onPress={() => onToggle(index)}
      >
        <Text style={styles.menuButtonText}>{isActive ? "✕" : "⋯"}</Text>
      </TouchableOpacity>

      {isActive && (
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity
            style={[styles.menuItem, styles.editButton]}
            onPress={onEdit}
          >
            <Text style={styles.menuItemText}>✏️ Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.menuItemText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MiniMenu;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  miniMenuContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    zIndex: 100,
    marginBottom: 5,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e5e9",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuButtonActive: {
    backgroundColor: "#f1f5f9",
    transform: [{ scale: 0.95 }],
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  menuItemsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  menuItem: {
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  editButton: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
  },
  deleteButton: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});
