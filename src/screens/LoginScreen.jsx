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

  // 👁️ Show / Hide Password
  const [showPassword, setShowPassword] =
    useState(false);

  // 🔥 Load Saved Credentials
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {

    try {

      const savedEmail =
        await AsyncStorage.getItem(
          "savedEmail"
        );

      const savedPassword =
        await AsyncStorage.getItem(
          "savedPassword"
        );

      if (savedEmail) {
        setEmail(savedEmail);
      }

      if (savedPassword) {
        setPassword(savedPassword);
      }

    } catch (error) {

      console.log(
        "Load Credentials Error =>",
        error
      );
    }
  };

  const handleLogin = async () => {

    if (!email || !password) {

      Alert.alert(
        "Error",
        "Please enter email and password"
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email_id: email,
            passwords: password,
          }),
        }
      );

      const json =
        await response.json();

      console.log(
        "Login Response =>",
        json
      );

      if (json.status === 200) {

        Alert.alert(
          "Success",
          json.message
        );

        // 🔥 SAVE TOKEN
        await AsyncStorage.setItem(
          "token",
          json.token
        );

        // 🔥 SAVE EMAIL & PASSWORD
        await AsyncStorage.setItem(
          "savedEmail",
          email
        );

        await AsyncStorage.setItem(
          "savedPassword",
          password
        );

        navigation.replace("Tabs");

      } else {

        Alert.alert(
          "Login Failed",
          json.message ||
            "Invalid credentials"
        );
      }

    } catch (error) {

      console.log(
        "FULL ERROR OBJECT:",
        error
      );

      console.log(
        "ERROR MESSAGE:",
        error.message
      );

      Alert.alert(
        "Network Error",
        error.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <LinearGradient
      colors={[
        "#4A90E2",
        "#6A5ACD"
      ]}
      style={styles.gradient}
    >

      <SafeAreaView style={{ flex: 1 }}>

        <StatusBar
          barStyle="light-content"
        />

        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          style={styles.container}
        >

          {/* LOGO */}
          <View
            style={styles.logoContainer}
          >

            <MaterialIcons
              name="account-balance-wallet"
              size={70}
              color="#fff"
            />

            <Text style={styles.appName}>
              Finance Manager
            </Text>

            <Text style={styles.tagline}>
              Track • Save • Grow
            </Text>

          </View>

          {/* CARD */}
          <View style={styles.card}>

            <Text style={styles.title}>
              Welcome Back 👋
            </Text>

            {/* EMAIL */}
            <View
              style={styles.inputContainer}
            >

              <MaterialIcons
                name="email"
                size={20}
                color="#4A90E2"
              />

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
            <View
              style={styles.inputContainer}
            >

              <MaterialIcons
                name="lock"
                size={20}
                color="#4A90E2"
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={
                  !showPassword
                }
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              {/* 👁️ EYE BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                <MaterialIcons
                  name={
                    showPassword
                      ? "visibility"
                      : "visibility-off"
                  }
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

                {loading
                  ? "Logging in..."
                  : "Login"}

              </Text>

            </TouchableOpacity>

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
    backgroundColor: "#fff",
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

});