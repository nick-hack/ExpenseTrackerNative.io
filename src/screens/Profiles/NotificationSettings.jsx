import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const NotificationSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [expenseAlert, setExpenseAlert] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(true);

  const SettingItem = ({ icon, title, subtitle, value, onToggle }) => (
    <View style={styles.item}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={22} color="#4A90E2" />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#ccc", true: "#A7C7FF" }}
        thumbColor={value ? "#4A90E2" : "#f4f3f4"}
      />
    </View>
  );

  const saveSettings = () => {
    const payload = {
      pushEnabled,
      emailEnabled,
      smsEnabled,
      expenseAlert,
      monthlyReport,
    };

    console.log("Saved Settings:", payload);

    Alert.alert("Success", "Notification settings updated successfully!");
  };

  return (
    <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>
            <MaterialIcons name="notifications-active" size={40} color="#fff" />
            <Text style={styles.headerTitle}>Notification Settings</Text>
            <Text style={styles.headerSub}>
              Manage how you receive alerts
            </Text>
          </View>

          {/* SETTINGS CARD */}
          <View style={styles.card}>

            <SettingItem
              icon="notifications"
              title="Push Notifications"
              subtitle="Receive app alerts"
              value={pushEnabled}
              onToggle={setPushEnabled}
            />

            <SettingItem
              icon="email"
              title="Email Notifications"
              subtitle="Get updates via email"
              value={emailEnabled}
              onToggle={setEmailEnabled}
            />

            <SettingItem
              icon="sms"
              title="SMS Notifications"
              subtitle="Receive SMS alerts"
              value={smsEnabled}
              onToggle={setSmsEnabled}
            />

            <SettingItem
              icon="trending-up"
              title="Expense Alerts"
              subtitle="Notify when spending increases"
              value={expenseAlert}
              onToggle={setExpenseAlert}
            />

            <SettingItem
              icon="calendar-month"
              title="Monthly Reports"
              subtitle="Summary of income & expenses"
              value={monthlyReport}
              onToggle={setMonthlyReport}
            />

            {/* QUIET HOURS (UI ONLY) */}
            <View style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconBox}>
                  <MaterialIcons name="bedtime" size={22} color="#4A90E2" />
                </View>

                <View>
                  <Text style={styles.title}>Quiet Hours</Text>
                  <Text style={styles.subtitle}>
                    Silence notifications at night
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Text style={styles.link}>Set</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.button} onPress={saveSettings}>
            <MaterialIcons name="save" size={22} color="#fff" />
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NotificationSettings;

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
    marginTop: 10,
  },

  headerSub: {
    fontSize: 13,
    color: "#E6E6E6",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 6,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
    color: "#2C3E50",
  },

  subtitle: {
    fontSize: 12,
    color: "#7F8C8D",
  },

  link: {
    color: "#4A90E2",
    fontWeight: "bold",
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});