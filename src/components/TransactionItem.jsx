// components/TransactionItem.js

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const TransactionItem = ({
  item,
  formatCurrency,
}) => {

  const getCategoryIcon =
    (category) => {

      switch (category) {

        case "Electricity":
          return "bolt";

        case "Travel":
          return "directions-bus";

        default:
          return "account-balance-wallet";
      }
    };

  return (

    <View style={styles.card}>

      <View style={styles.left}>

        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor:
                item.amount < 0
                  ? "#E74C3C"
                  : "#2ECC71",
            },
          ]}
        >

          <MaterialIcons
            name={getCategoryIcon(
              item.category
            )}
            size={18}
            color="#fff"
          />

        </View>

        <View>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.date}>
            {new Date(
              item.date
            ).toLocaleDateString(
              "en-IN"
            )}
          </Text>

        </View>

      </View>

      <Text
        style={[
          styles.amount,
          {
            color:
              item.amount < 0
                ? "#E74C3C"
                : "#2ECC71",
          },
        ]}
      >

        {item.amount < 0
          ? "- "
          : "+ "}

        {formatCurrency(
          item.amount
        )}

      </Text>

    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  date: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 2,
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },

});