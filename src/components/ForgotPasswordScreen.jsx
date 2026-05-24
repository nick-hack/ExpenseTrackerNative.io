import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../../Config";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (type, message) => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupVisible(true);
  };

  /* ================= SAFE JSON HANDLER ================= */
  const safeParse = async (response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      console.log("RAW RESPONSE (NOT JSON):", text);
      return null;
    }
  };

  const handleReset = async () => {
    if (!email) {
      showPopup("error", "Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email_id: email }),
      });

      /* 🔥 FIX: SAFE PARSING */
      const json = await safeParse(res);

      if (!json) {
        showPopup(
          "error",
          "Server returned invalid response (not JSON). Check API URL."
        );
        return;
      }

      if (res.ok && json.status === 200) {
        showPopup("success", "Reset link sent to your email ✉️");
      } else {
        showPopup("error", json.message || "Failed to send reset email");
      }
    } catch (err) {
      showPopup("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#4A90E2", "#6A5ACD"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ================= POPUP ================= */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <MaterialIcons
              name={popupType === "success" ? "check-circle" : "error"}
              size={60}
              color={popupType === "success" ? "#2ECC71" : "#E74C3C"}
            />

            <Text style={styles.modalTitle}>
              {popupType === "success" ? "Success" : "Error"}
            </Text>

            <Text style={styles.modalMessage}>{popupMessage}</Text>

            <TouchableOpacity
              style={[
                styles.modalBtn,
                {
                  backgroundColor:
                    popupType === "success" ? "#2ECC71" : "#E74C3C",
                },
              ]}
              onPress={() => {
                setPopupVisible(false);

                if (popupType === "success") {
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= UI ================= */}
      <View style={styles.card}>
        <MaterialIcons name="lock-reset" size={60} color="#4A90E2" />

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive reset link
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.btn} onPress={handleReset}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2C3E50",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  btn: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  modalMessage: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },

  modalBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});