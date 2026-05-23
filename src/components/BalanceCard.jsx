// components/BalanceCard.js

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const BalanceCard = ({
  totalBalance,
  formatCurrency,
}) => {

  return (

    <View style={styles.card}>

      <Text style={styles.label}>
        Total Balance
      </Text>

      <Text style={styles.amount}>
        {formatCurrency(
          totalBalance
        )}
      </Text>

    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#4A90E2",
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