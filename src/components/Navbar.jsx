import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationContext } from "../components/NotificationContext";

const Navbar = ({ navigation }) => {
  const { unreadCount } = useContext(NotificationContext);

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Finance Manager</Text>

      <View style={styles.icons}>

        {/* NOTIFICATION */}
        <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")}>
          <MaterialIcons name="notifications" size={26} color="#fff" />

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons name="account-circle" size={28} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  icons: { flexDirection: "row", gap: 20 },

  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});