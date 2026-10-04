import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NotificationContext } from "../components/NotificationContext";
import { MaterialIcons } from "@expo/vector-icons";

const NotificationsScreen = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: item.read ? "#f2f2f2" : "#fff" },
            ]}
            onPress={() => markAsRead(item.id)}
          >
            <MaterialIcons
              name="notifications"
              size={24}
              color={item.read ? "#999" : "#4A90E2"}
            />

            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.msg}>{item.message}</Text>
            </View>

            {!item.read && <View style={styles.dot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 15 },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },

  title: { fontSize: 16, fontWeight: "bold" },
  msg: { fontSize: 13, color: "#666" },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});