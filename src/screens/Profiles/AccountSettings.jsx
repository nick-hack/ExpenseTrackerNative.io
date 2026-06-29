import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AccountSettings = ({ navigation }) => {
  const user = {
    name: "Aniket Kavathekar",
    email: "aniketkavathekar4@gmail.com",
    phone: "+91 9999999999",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const MenuItem = ({ icon, title, subtitle, onPress, color = "#2C3E50" }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={22} color="#4A90E2" />
        </View>

        <View>
          <Text style={[styles.title, { color }]}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  const logout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account Settings</Text>
            <Text style={styles.headerSub}>
              Manage your profile & security
            </Text>
          </View>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.info}>{user.phone}</Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialIcons name="edit" size={18} color="#fff" />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* SETTINGS MENU */}
          <View style={styles.menuCard}>

            <MenuItem
              icon="person"
              title="Personal Information"
              subtitle="Update your name, email, phone"
              onPress={() => navigation.navigate("EditProfile")}
            />

            <MenuItem
              icon="lock"
              title="Change Password"
              subtitle="Secure your account"
              onPress={() => navigation.navigate("ChangePassword")}
            />

            <MenuItem
              icon="security"
              title="Privacy & Security"
              subtitle="Manage data protection"
              onPress={() => navigation.navigate("PrivacySecurity")}
            />

            <MenuItem
              icon="notifications"
              title="Notification Settings"
              subtitle="Control alerts & updates"
              onPress={() => navigation.navigate("NotificationSettings")}
            />

            <MenuItem
              icon="help-outline"
              title="Help & Support"
              subtitle="Get assistance anytime"
              onPress={() => navigation.navigate("HelpSupport")}
            />

            <MenuItem
              icon="info"
              title="About App"
              subtitle="Version & developer info"
              onPress={() => navigation.navigate("AboutApp")}
            />

            {/* LOGOUT */}
            <MenuItem
              icon="logout"
              title="Logout"
              subtitle="Sign out from account"
              color="#E74C3C"
              onPress={logout}
            />

          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AccountSettings;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSub: {
    fontSize: 13,
    color: "#EAEAEA",
    marginTop: 4,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 6,
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#4A90E2",
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  info: {
    fontSize: 13,
    color: "#7F8C8D",
  },

  editBtn: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#4A90E2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600",
  },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 6,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 12,
    color: "#7F8C8D",
  },
});