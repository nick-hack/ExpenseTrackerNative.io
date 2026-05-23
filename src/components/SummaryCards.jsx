// components/SummaryCards.js

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const SummaryCards = ({
  totalIncome,
  totalExpense,
  formatCurrency,
}) => {

  return (

    <View style={styles.container}>

      <View style={styles.incomeCard}>

        <MaterialIcons
          name="trending-up"
          size={22}
          color="#2ECC71"
        />

        <Text style={styles.title}>
          Income
        </Text>

        <Text style={styles.incomeText}>
          {formatCurrency(
            totalIncome
          )}
        </Text>

      </View>

      <View style={styles.expenseCard}>

        <MaterialIcons
          name="trending-down"
          size={22}
          color="#E74C3C"
        />

        <Text style={styles.title}>
          Expense
        </Text>

        <Text style={styles.expenseText}>
          {formatCurrency(
            totalExpense
          )}
        </Text>

      </View>

    </View>
  );
};

export default SummaryCards;

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 20,
  },

  incomeCard: {
    backgroundColor: "#E8F8F5",
    width: "48%",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  expenseCard: {
    backgroundColor: "#FDEDEC",
    width: "48%",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  title: {
    marginTop: 5,
    color: "#7F8C8D",
  },

  incomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ECC71",
    marginTop: 5,
  },

  expenseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E74C3C",
    marginTop: 5,
  },

});