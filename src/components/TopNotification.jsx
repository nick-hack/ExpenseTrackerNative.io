import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

const TopNotification = ({ visible, title, message, onHide }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 30000); // 30 sec
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.msg}>{message}</Text>
    </Animated.View>
  );
};

export default TopNotification;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 12,
    zIndex: 999,
  },
  title: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  msg: { color: "#fff", fontSize: 13 },
});