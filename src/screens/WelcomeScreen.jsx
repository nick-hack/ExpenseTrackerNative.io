import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // Floating animation (infinite loop)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ).start();

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#4A90E2", "#6C63FF"]}
        style={styles.gradient}
      >

        {/* Floating Wallet Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: floatAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <MaterialIcons name="account-balance-wallet" size={90} color="#fff" />
        </Animated.View>

        {/* Title */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          Expense Manager
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          Track your income & expenses easily.
          {"\n"}Stay financially smart 💰
        </Animated.Text>

        {/* Buttons */}
        <Animated.View
          style={{
            width: width * 0.85,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text style={[styles.footerText, { opacity: fadeAnim }]}>
          Manage your money smarter & better.
        </Animated.Text>

      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 25,
    borderRadius: 100,
    marginBottom: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#EAEAEA",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: width * 0.85,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#fff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    fontSize: 13,
    color: "#EAEAEA",
  },
});

