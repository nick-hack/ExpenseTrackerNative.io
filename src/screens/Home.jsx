// screens/Home.js
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config";

import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import FloatingButton from "../components/FloatingButton";
import GreetingSection from "../components/GreetingSection";

const Home = ({ navigation }) => {
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

  /* ================= BACK BUTTON FIX ================= */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // ✅ Prevent going back or logout
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove(); // ✅ CORRECT FIX
    }, [])
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/getUserById`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await response.json();

      if (json?.status === 200 && json?.data?.length > 0) {
        setUser(json.data[0]);
        await fetchExpenses(token);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/getAllExpensesByUserId`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await response.json();

      if (json?.status === 200) {
        const data = json?.data;

        setTotalIncome(Number(data?.totalIncome || 0));
        setTotalExpense(Number(data?.totalExpense || 0));
        setTotalBalance(Number(data?.Remaining_Amount || 0));

        const formatted = Array.isArray(data?.data)
          ? data.data.map((item) => ({
              id: String(item?.id),
              title: item?.Title || "No Title",
              amount:
                Number(item?.Income || 0) > 0
                  ? Number(item?.Income || 0)
                  : -Number(item?.Expenses || 0),
              date: item?.Expenses_date || "",
              category: item?.category_name || "Other",
            }))
          : [];

        setTransactions(formatted);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    if (token) await fetchExpenses(token);
    setRefreshing(false);
  }, []);

  const formatCurrency = (amount) => {
    const value = Math.abs(amount).toLocaleString("en-IN");
    return amount < 0 ? `₹ ${value}` : `₹ ${value}`;
  };

  const getBalanceColor = (value) =>
    Number(value) < 0 ? "#E74C3C" : "#4A90E2";

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
          balanceColor={getBalanceColor(totalBalance)}
        />

        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          formatCurrency={formatCurrency}
        />

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem item={item} formatCurrency={formatCurrency} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <FloatingButton onPress={() => navigation.navigate("AddExpense")} />
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

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
});