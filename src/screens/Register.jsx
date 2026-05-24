import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../../Config";

/* ================= INPUT ================= */
const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secure,
  toggleSecure,
  showEye,
}) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons name={icon} size={22} color="#4A90E2" />

      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />

      {showEye && (
        <TouchableOpacity onPress={toggleSecure}>
          <MaterialIcons
            name={secure ? "visibility-off" : "visibility"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const EmployeeRegister = ({ navigation }) => {
  const scrollRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert("Validation", "Please fill all required fields");
      return false;
    }

    if (password.length < 4) {
      Alert.alert("Validation", "Password must be at least 4 characters");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match");
      return false;
    }

    return true;
  };

  /* ================= REGISTER API ================= */
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const otp = Math.floor(1000 + Math.random() * 9000);

      const body = {
        first_name: firstName,
        middle_name: middleName || "",
        last_name: lastName,
        email_id: email,
        email_verified_at: 0,
        mobile_no: phone,
        mobile_at_verified: 0,
        otp: otp,
        is_verified_otp: 0,
        passwords: password,
        is_role: null,
        country_id: 1,
        city_id: 1,
        currency_id: 1,
        profile_pic: null,
      };

      const res = await fetch(`${BASE_URL}/InsertUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      console.log("REGISTER RESPONSE:", json);

      if (json?.status === 200) {
        Alert.alert("Success", "Registered Successfully 🎉");

        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      } else {
        Alert.alert("Error", json?.message || "Registration failed");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* HEADER */}
      <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.header}>
        <Text style={styles.headerTitle}>Employee Register</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* INPUT FIELDS */}
          <InputField icon="person" placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          <InputField icon="person-outline" placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
          <InputField icon="person" placeholder="Last Name" value={lastName} onChangeText={setLastName} />

          <InputField icon="email" placeholder="Email" value={email} onChangeText={setEmail} />
          <InputField icon="phone" placeholder="Mobile Number" value={phone} onChangeText={setPhone} />

          <InputField
            icon="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secure={securePass}
            toggleSecure={() => setSecurePass(!securePass)}
            showEye
          />

          <InputField
            icon="lock-outline"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secure={secureConfirm}
            toggleSecure={() => setSecureConfirm(!secureConfirm)}
            showEye
          />

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* 🔥 BEAUTIFUL LOGIN LINK */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginHintText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}
              style={styles.loginLinkButton}
            >
              <MaterialIcons name="login" size={18} color="#4A90E2" />
              <Text style={styles.loginLinkText}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmployeeRegister;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#4A90E2",
  },

  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  registerButton: {
    backgroundColor: "#4A90E2",
    padding: 18,
    margin: 20,
    borderRadius: 25,
    alignItems: "center",
  },

  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* 🔥 LOGIN LINK UI */
  loginLinkContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  loginHintText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  loginLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D6E4FF",
    gap: 6,
    elevation: 2,
  },

  loginLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
});