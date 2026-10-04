import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { BASE_URL } from "../../Config";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
        return;
      }

      const userResponse = await fetch(`${BASE_URL}/getUserById`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userJson = await userResponse.json();

      if (userJson?.status === 200 && userJson?.data?.length > 0) {
        setUser(userJson.data[0]);
      }

      const expenseResponse = await fetch(
        `${BASE_URL}/getAllExpensesByUserId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const expenseJson = await expenseResponse.json();

      if (expenseJson?.status === 200) {
        setSummary(expenseJson.data);
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // 1. clear storage
      await AsyncStorage.clear();

      // 2. reset navigation to Welcome screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        })
      );

      // ❌ DO NOT USE THIS (it closes app)
      // BackHandler.exitApp();

    } catch (error) {
      console.log("Logout error:", error);
      Alert.alert("Error", "Logout failed");
    }
  };


  const MenuItem = ({ icon, title, onPress, color = "#2C3E50" }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={22} color="#4A90E2" />
        </View>
        <Text style={[styles.menuText, { color }]}>{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={22} color="#999" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{
              uri: user?.profile_pic || "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user?.first_name} {user?.last_name}
          </Text>

          <Text style={styles.email}>
            {user?.email_id} | {user?.mobile_no}
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {/* <MenuItem icon="person" title="Account Settings" onPress={() => navigation.navigate("AccountSettings")} /> */}
          <MenuItem icon="person" title="Account Settings"  />
    
           <MenuItem
            icon="assessment"
            title="Reports"
            onPress={() => navigation.navigate("Reports")}
          />
          <MenuItem icon="lock" title="Change Password" onPress={() => navigation.navigate("ChangePassword")}/>
          <MenuItem icon="notifications" title="Notification Settings" onPress={() => navigation.navigate("NotificationSettings")} />
          <MenuItem icon="security" title="Privacy & Security" onPress={() => navigation.navigate("PrivacySecurity")} />
          <MenuItem icon="help-outline" title="Help & Support" onPress={() => navigation.navigate("HelpSupport")} />
          <MenuItem icon="info-outline" title="About App" 
           onPress={() => navigation.navigate("AboutApp")}/>

          <MenuItem
            icon="logout"
            title="Logout"
            color="#E74C3C"
            onPress={handleLogout}   // ✅ FIXED HERE
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#4A90E2",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#4A90E2",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 15,
  },
  menuContainer: {
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  menuItem: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
  },
});