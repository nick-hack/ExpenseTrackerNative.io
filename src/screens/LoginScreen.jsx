import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      const savedPassword = await AsyncStorage.getItem("savedPassword");

      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: email,
          passwords: password,
        }),
      });

      const json = await response.json();

      if (json.status === 200) {
        Alert.alert("Success", json.message);

        await AsyncStorage.setItem("token", json.token);
        await AsyncStorage.setItem("savedEmail", email);
        await AsyncStorage.setItem("savedPassword", password);

        navigation.replace("Tabs");
      } else {
        Alert.alert("Login Failed", json.message);
      }
    } catch (error) {
      Alert.alert("Network Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#4A90E2", "#6A5ACD"]} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* HEADER */}
          <View style={styles.logoContainer}>
            <MaterialIcons
              name="account-balance-wallet"
              size={70}
              color="#fff"
            />
            <Text style={styles.appName}>Finance Manager</Text>
            <Text style={styles.tagline}>Track • Save • Grow</Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back 👋</Text>

            {/* EMAIL */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#4A90E2" />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#999"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#4A90E2" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={22}
                  color="#777"
                />
              </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>

            {/* LINKS SECTION */}
            <View style={styles.linkContainer}>
              {/* 🔥 FIXED HERE */}
              <TouchableOpacity
                style={styles.linkBox}
                onPress={() => navigation.navigate("Register")}
              >
                <MaterialIcons name="person-add" size={16} color="#4A90E2" />
                <Text style={styles.linkText}>Signup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBox}
                onPress={() =>
                  navigation.navigate("ForgotPassword")
                }
              >
                <MaterialIcons name="lock-reset" size={16} color="#4A90E2" />
                <Text style={styles.linkText}>Forgot</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBox}
                onPress={() =>
                  navigation.navigate("MobileLogin")
                }
              >
                <MaterialIcons
                  name="phone-android"
                  size={16}
                  color="#4A90E2"
                />
                <Text style={styles.linkText}>Mobile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  tagline: {
    fontSize: 14,
    color: "#EAEAEA",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    elevation: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2C3E50",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },

  loginButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D6E4FF",
    gap: 6,
  },

  linkText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A90E2",
  },
});