import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PrivacySecurity = () => {
  const InfoCard = ({ icon, title, desc }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color="#4A90E2" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
    </View>
  );

  const Badge = ({ icon, text }) => (
    <View style={styles.badge}>
      <MaterialIcons name={icon} size={18} color="#fff" />
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>
            <MaterialIcons name="security" size={45} color="#fff" />
            <Text style={styles.title}>Privacy & Security</Text>
            <Text style={styles.subtitle}>
              Your data safety is our top priority
            </Text>
          </View>

          {/* BADGES */}
          <View style={styles.badgeRow}>
            <Badge icon="lock" text="Encrypted Data" />
            <Badge icon="verified-user" text="Secure Login" />
            <Badge icon="shield" text="Protected API" />
          </View>

          {/* INFO SECTION */}
          <View style={styles.section}>

            <InfoCard
              icon="lock-outline"
              title="Data Protection"
              desc="All your personal data is securely encrypted and stored using industry-standard security protocols."
            />

            <InfoCard
              icon="cloud"
              title="Cloud Security"
              desc="We use secure cloud servers to store your data with strict access control policies."
            />

            <InfoCard
              icon="fingerprint"
              title="Authentication"
              desc="Your login is protected using JWT authentication and secure token handling."
            />

            <InfoCard
              icon="visibility-off"
              title="Privacy Policy"
              desc="We do not sell or share your personal information with third parties."
            />

            <InfoCard
              icon="bug-report"
              title="Security Updates"
              desc="We regularly update our system to protect against vulnerabilities and threats."
            />

          </View>

          {/* FOOTER NOTE */}
          <View style={styles.footerBox}>
            <MaterialIcons name="info" size={22} color="#4A90E2" />
            <Text style={styles.footerText}>
              Your trust matters. We continuously improve our security systems
              to keep your data safe.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PrivacySecurity;

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

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    color: "#EAEAEA",
    marginTop: 4,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 5,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 6,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
  },

  cardDesc: {
    fontSize: 12,
    color: "#7F8C8D",
  },

  footerBox: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#2C3E50",
    lineHeight: 18,
  },
});