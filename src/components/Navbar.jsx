// components/Navbar.js

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const Navbar = ({
  navigation,
}) => {

  return (

    <View style={styles.navbar}>

      <Text style={styles.title}>
        Finance Manager
      </Text>

      <View style={styles.icons}>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Notifications"
            )
          }
        >

          <MaterialIcons
            name="notifications"
            size={26}
            color="#fff"
          />

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Profile"
            )
          }
        >

          <MaterialIcons
            name="account-circle"
            size={28}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({

  navbar: {
    height: 60,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

});