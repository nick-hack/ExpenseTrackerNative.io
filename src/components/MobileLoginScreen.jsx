// MobileLoginScreen.jsx

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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { BASE_URL } from "../../Config";

const MobileLoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  /* ================= POPUP ================= */

  const showPopup = (msg, autoClose = false) => {
    setPopupMessage(msg);
    setPopupVisible(true);

    if (autoClose) {
      setTimeout(() => {
        setPopupVisible(false);
      }, 5000);
    }
  };

  /* ================= API CALL ================= */

  const handleMobileLogin = async () => {
    if (!mobile) {
      showPopup("Please enter mobile number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/MobileLogin`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          mobile_no: mobile,
          otp: otp,
        }),
      });

      let json = null;

      try {
        json = await response.json();
      } catch (e) {
        console.log("JSON Parse Error", e);
      }

      console.log("LOGIN RESPONSE =>", json);

      /* ================= SEND OTP ================= */

      if (!otp) {
        if (
          json?.message === "OTP sent on mobile number" ||
          json?.status === 200
        ) {
          showPopup("OTP sent on mobile number 📲", true);
        } else {
          showPopup(json?.message || "Failed to send OTP");
        }

        return;
      }

      /* ================= LOGIN SUCCESS ================= */

      if (json?.status === 200) {
        // SAVE TOKEN

        if (json?.token) {
          await AsyncStorage.setItem("token", json.token);
        }

        showPopup("Login Successful 🎉");

        setTimeout(() => {
          setPopupVisible(false);

          // ✅ OPEN TABS SCREEN
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        }, 1500);
      } else {
        showPopup(json?.message || "Invalid OTP ❌");
      }
    } catch (error) {
      console.log("LOGIN ERROR =>", error);

      showPopup("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4A90E2", "#6A5ACD"]}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* ================= POPUP ================= */}

      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <LinearGradient
              colors={["#4A90E2", "#6A5ACD"]}
              style={styles.iconCircle}
            >
              <MaterialIcons
                name="phone-android"
                size={40}
                color="#fff"
              />
            </LinearGradient>

            <Text style={styles.modalTitle}>
              Finance Manager
            </Text>

            <Text style={styles.modalText}>
              {popupMessage}
            </Text>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setPopupVisible(false)}
            >
              <Text style={styles.modalBtnText}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= CARD ================= */}

      <View style={styles.card}>
        {/* TOP ICON */}

        <LinearGradient
          colors={["#4A90E2", "#6A5ACD"]}
          style={styles.topIcon}
        >
          <MaterialIcons
            name="phone-android"
            size={45}
            color="#fff"
          />
        </LinearGradient>

        {/* TITLE */}

        <Text style={styles.title}>
          Mobile Login
        </Text>

        <Text style={styles.subtitle}>
          Login using mobile OTP
        </Text>

        {/* MOBILE INPUT */}

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="phone"
            size={22}
            color="#4A90E2"
          />

          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            style={styles.input}
            value={mobile}
            maxLength={10}
            onChangeText={setMobile}
          />
        </View>

        {/* OTP INPUT */}

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="lock"
            size={22}
            color="#4A90E2"
          />

          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            style={styles.input}
            value={otp}
            maxLength={4}
            onChangeText={setOtp}
          />
        </View>

        {/* SEND OTP BUTTON */}

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={handleMobileLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>
              Send OTP
            </Text>
          )}
        </TouchableOpacity>

        {/* VERIFY BUTTON */}

        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleMobileLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>
              Verify OTP & Login
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default MobileLoginScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 25,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  topIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",

    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",

    marginTop: 8,
    marginBottom: 25,

    fontSize: 14,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E0E0E0",

    borderRadius: 15,

    paddingHorizontal: 15,

    marginBottom: 18,

    backgroundColor: "#F8FAFF",
  },

  input: {
    flex: 1,

    paddingVertical: 14,

    marginLeft: 10,

    fontSize: 15,
    color: "#000",
  },

  sendBtn: {
    backgroundColor: "#6A5ACD",

    paddingVertical: 15,

    borderRadius: 15,

    alignItems: "center",

    marginBottom: 12,
  },

  verifyBtn: {
    backgroundColor: "#4A90E2",

    paddingVertical: 15,

    borderRadius: 15,

    alignItems: "center",
  },

  btnText: {
    color: "#fff",

    fontSize: 16,
    fontWeight: "bold",
  },

  /* ================= MODAL ================= */

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.5)",

    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "82%",

    backgroundColor: "#fff",

    borderRadius: 25,

    padding: 25,

    alignItems: "center",
  },

  iconCircle: {
    width: 80,
    height: 80,

    borderRadius: 40,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",

    color: "#2C3E50",

    marginBottom: 10,
  },

  modalText: {
    fontSize: 16,

    color: "#555",

    textAlign: "center",

    lineHeight: 24,

    marginBottom: 20,
  },

  modalBtn: {
    backgroundColor: "#4A90E2",

    paddingVertical: 12,
    paddingHorizontal: 35,

    borderRadius: 12,
  },

  modalBtnText: {
    color: "#fff",

    fontWeight: "bold",

    fontSize: 15,
  },
});