import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const HelpSupport = () => {
  const email = "aniketkavathekar4@gmail.com";

  const openEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const openCall = () => {
    Linking.openURL("tel:+919999999999");
  };

  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/919999999999");
  };

  const FAQItem = ({ q, a }) => (
    <View style={styles.faqBox}>
      <Text style={styles.faqQ}>Q. {q}</Text>
      <Text style={styles.faqA}>{a}</Text>
    </View>
  );

  const SupportCard = ({ icon, title, desc, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color="#4A90E2" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>
            <MaterialIcons name="support-agent" size={45} color="#fff" />
            <Text style={styles.title}>Help & Support</Text>
            <Text style={styles.subtitle}>
              We are here to help you anytime
            </Text>
          </View>

          {/* CONTACT OPTIONS */}
          <View style={styles.section}>

            <SupportCard
              icon="email"
              title="Email Support"
              desc="Send us an email anytime"
              onPress={openEmail}
            />

            <SupportCard
              icon="call"
              title="Call Support"
              desc="Talk with our support team"
              onPress={openCall}
            />

            <SupportCard
              icon="chat"
              title="WhatsApp Support"
              desc="Quick help on WhatsApp"
              onPress={openWhatsApp}
            />
          </View>

          {/* EMAIL DISPLAY CARD */}
          <View style={styles.emailCard}>
            <MaterialIcons name="mail-outline" size={28} color="#4A90E2" />
            <Text style={styles.emailText}>{email}</Text>

            <TouchableOpacity style={styles.emailBtn} onPress={openEmail}>
              <Text style={styles.emailBtnText}>Send Email</Text>
            </TouchableOpacity>
          </View>

          {/* FAQ SECTION */}
          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

            <FAQItem
              q="How do I reset my password?"
              a="Go to profile → Change password option and follow steps."
            />

            <FAQItem
              q="How to track expenses?"
              a="Use the dashboard to add and monitor your income & expenses."
            />

            <FAQItem
              q="Is my data safe?"
              a="Yes, we use secure authentication and encrypted APIs."
            />
          </View>

          {/* FOOTER */}
          <Text style={styles.footer}>
            © 2026 Expense Tracker App | Built with ❤️ by Aniket Kavathekar
          </Text>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HelpSupport;

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

  section: {
    marginTop: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 4,
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

  emailCard: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },

  emailText: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 10,
    color: "#2C3E50",
  },

  emailBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  emailBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  faqSection: {
    marginTop: 25,
  },

  faqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  faqBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  faqQ: {
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },

  faqA: {
    color: "#555",
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    marginTop: 20,
    opacity: 0.8,
  },
});