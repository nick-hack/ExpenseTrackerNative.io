// screens/Home.js

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../Config";

import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import FloatingButton from "../components/FloatingButton";
import GreetingSection from "../components/GreetingSection";

const Home = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  /* ================= USER API ================= */
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.replace("Login");
        return;
      }

      const response = await fetch(`${BASE_URL}/getUserById`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (
        json?.status === 200 &&
        Array.isArray(json?.data) &&
        json.data.length > 0
      ) {
        setUser(json.data[0]);

        await fetchExpenses(token);
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      console.log("USER API ERROR =>", error);
      navigation.replace("Login");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EXPENSE API ================= */
  const fetchExpenses = async (token) => {
    try {
      const response = await fetch(
        `${BASE_URL}/getAllExpensesByUserId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      if (json?.status === 200) {
        const apiData = json?.data;

        setTotalIncome(parseFloat(apiData?.totalIncome || 0));
        setTotalExpense(parseFloat(apiData?.totalExpense || 0));
        setTotalBalance(parseFloat(apiData?.Remaining_Amount || 0));

        const formatted = Array.isArray(apiData?.data)
          ? apiData.data.map((item) => ({
              id: String(item?.id),
              title: item?.Title || "No Title",
              amount:
                parseFloat(item?.Income || 0) > 0
                  ? parseFloat(item?.Income || 0)
                  : -parseFloat(item?.Expenses || 0),
              date: item?.Expenses_date || "",
              category: item?.category_name || "Other",
            }))
          : [];

        setTransactions(formatted);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.log("EXPENSE API ERROR =>", error);
      setTransactions([]);
    }
  };

  /* ================= PULL TO REFRESH ================= */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await fetchExpenses(token);
      }
    } catch (error) {
      console.log("REFRESH ERROR =>", error);
    }

    setRefreshing(false);
  }, []);

  /* ================= FORMAT ================= */
  const formatCurrency = (amount) =>
    `₹ ${Math.abs(amount).toLocaleString("en-IN")}`;

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <Navbar navigation={navigation} />

      <View style={styles.container}>
        <GreetingSection user={user} today={today} />

        <BalanceCard
          totalBalance={totalBalance}
          formatCurrency={formatCurrency}
        />

        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          formatCurrency={formatCurrency}
        />

        {/* ================= FLATLIST ================= */}
        {transactions.length === 0 ? (
          <FlatList
            data={[]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#4A90E2"]}
                tintColor="#4A90E2"
              />
            }
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 30, color: "#777" }}>
                No transactions found
              </Text>
            }
          />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionItem item={item} formatCurrency={formatCurrency} />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#4A90E2"]}
                tintColor="#4A90E2"
              />
            }
          />
        )}
      </View>

      {/* ✅ FIXED NAVIGATION */}
      <FloatingButton
        onPress={() => navigation.navigate("AddExpense")}
      />
    </SafeAreaView>
  );
};

export default Home;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#4A90E2",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});