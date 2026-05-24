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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        Alert.alert("Session Expired", "Please login again");
        navigation.replace("Login");
        return;
      }

      /* ================= USER API ================= */
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

      /* ================= EXPENSE SUMMARY API ================= */
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
      console.log("Network Error:", error);
      Alert.alert("Error", "Unable to connect to server");
    } finally {
      setLoading(false);
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{
              uri:
                user?.profile_pic ||
                "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user?.first_name} {user?.last_name}
          </Text>

          <Text style={styles.email}>
            {user?.email_id} | {user?.mobile_no}
          </Text>

     <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile", { userData: user })}
      >
        <MaterialIcons name="edit" size={18} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
        </View>

        {/* STATS SECTION */}
        {summary && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialIcons name="trending-up" size={24} color="#2ECC71" />
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statValue, { color: "#2ECC71" }]}>
                ₹ {Number(summary.totalIncome).toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.statCard}>
              <MaterialIcons name="trending-down" size={24} color="#E74C3C" />
              <Text style={styles.statLabel}>Expense</Text>
              <Text style={[styles.statValue, { color: "#E74C3C" }]}>
                ₹ {Number(summary.totalExpense).toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.statCard}>
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="#4A90E2"
              />
              <Text style={styles.statLabel}>Balance</Text>
              <Text style={[styles.statValue, { color: "#4A90E2" }]}>
                ₹ {Number(summary.Remaining_Amount).toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        )}

        {/* MENU */}
        <View style={styles.menuContainer}>
          <MenuItem icon="person" title="Account Settings" />
          <MenuItem
            icon="assessment"
            title="Reports"
            onPress={() => navigation.navigate("Reports")}
          />
          <MenuItem icon="lock" title="Change Password" />
          <MenuItem icon="notifications" title="Notification Settings" />
          <MenuItem icon="security" title="Privacy & Security" />
          <MenuItem icon="help-outline" title="Help & Support" />
          <MenuItem icon="info-outline" title="About App" />

          <MenuItem
            icon="logout"
            title="Logout"
            color="#E74C3C"
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              navigation.replace("Login");
            }}
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
    backgroundColor: '#4A90E2'
  },

  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#4A90E2',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 15
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },

  email: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 15
  },

  editBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    gap: 5
  },

  editText: {
    color: '#fff',
    fontWeight: '600'
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F4F6FA',
    marginTop: -20,
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  statCard: {
    alignItems: 'center'
  },

  statLabel: {
    marginTop: 6,
    fontSize: 13,
    color: '#7F8C8D'
  },

  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  },

  menuContainer: {
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20,
    paddingBottom: 30
  },

  menuItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600'
  }

})
