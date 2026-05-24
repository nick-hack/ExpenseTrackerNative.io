// components/BalanceCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BalanceCard = ({ totalBalance, formatCurrency }) => {
  const balance = Number(totalBalance || 0);

  const isNegative = balance < 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isNegative ? "#E74C3C" : "#4A90E2",
        },
      ]}
    >
      <Text style={styles.label}>Total Balance</Text>

      <Text style={styles.amount}>
        {balance < 0
          ? `-₹ ${Math.abs(balance).toLocaleString("en-IN")}`
          : `₹ ${balance.toLocaleString("en-IN")}`}
      </Text>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    padding: 30,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 6,
  },

  label: {
    color: "#fff",
    fontSize: 16,
  },

  amount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
});