// components/FloatingButton.js

import React from "react";

import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const FloatingButton = ({
  onPress,
}) => {

  return (

    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
    >

      <MaterialIcons
        name="add"
        size={30}
        color="#fff"
      />

    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4A90E2",
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

});