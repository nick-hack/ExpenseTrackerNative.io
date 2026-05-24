// components/GreetingSection.js

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const GreetingSection = ({
  user,
  today,
}) => {

  return (

    <View>

      <Text style={styles.greeting}>
        Hello,
        {" "}
        {user?.first_name}
        {" "}
        {user?.last_name}
        👋
      </Text>

      <Text style={styles.date}>
        {today}
      </Text>

    </View>
  );
};

export default GreetingSection;

const styles = StyleSheet.create({

  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  date: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 4,
  },

});