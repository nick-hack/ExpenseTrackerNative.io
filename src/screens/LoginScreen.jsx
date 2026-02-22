import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#4A90E2", "#6A5ACD"]}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <MaterialIcons name="account-balance-wallet" size={70} color="#fff" />
            <Text style={styles.appName}>Finance Manager</Text>
            <Text style={styles.tagline}>Track • Save • Grow</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>

            <Text style={styles.title}>Welcome Back 👋</Text>

            {/* Email */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#4A90E2" />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#4A90E2" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.replace("Tabs")}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signupRow}>
              <Text style={{ color: "#555" }}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
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
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
