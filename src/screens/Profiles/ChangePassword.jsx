import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ANIMATIONS */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const validateAndSave = () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (newPass.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters");
      return;
    }

    if (newPass !== confirmPass) {
      Alert.alert("Error", "New password and confirm password do not match");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
  };

  const InputField = ({
    icon,
    placeholder,
    value,
    setValue,
    secure,
    toggle,
    show,
  }) => (
    <View style={styles.inputBox}>
      <MaterialIcons name={icon} size={22} color="#4A90E2" />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={setValue}
        secureTextEntry={!show && secure}
      />

      {secure && (
        <TouchableOpacity onPress={toggle}>
          <MaterialIcons
            name={show ? "visibility" : "visibility-off"}
            size={22}
            color="#999"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const glowTranslate = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

  return (
    <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >

          {/* BACKGROUND GLOW */}
          <Animated.View
            style={[
              styles.glow,
              {
                transform: [{ translateY: glowTranslate }],
                opacity: 0.2,
              },
            ]}
          />

          {/* HEADER */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <MaterialIcons name="lock-reset" size={50} color="#fff" />
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.subtitle}>
              Secure your account with a new password
            </Text>
          </Animated.View>

          {/* FORM */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >

            <InputField
              icon="lock"
              placeholder="Old Password"
              value={oldPass}
              setValue={setOldPass}
              secure
              show={showOld}
              toggle={() => setShowOld(!showOld)}
            />

            <InputField
              icon="lock-outline"
              placeholder="New Password"
              value={newPass}
              setValue={setNewPass}
              secure
              show={showNew}
              toggle={() => setShowNew(!showNew)}
            />

            <InputField
              icon="verified-user"
              placeholder="Confirm Password"
              value={confirmPass}
              setValue={setConfirmPass}
              secure
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
            />

            {/* BUTTON */}
            <TouchableOpacity style={styles.button} onPress={validateAndSave}>
              <MaterialIcons name="save" size={22} color="#fff" />
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>

          </Animated.View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChangePassword;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    top: 80,
    left: 100,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
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
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 20,
    elevation: 8,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6FA",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
    height: 55,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});