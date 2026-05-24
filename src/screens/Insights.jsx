import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart, BarChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../../Config";

const screenWidth = Dimensions.get("window").width;

const Insights = () => {
  const [fromDate, setFromDate] = useState(new Date("2025-04-01"));
  const [toDate, setToDate] = useState(new Date("2026-03-31"));

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // ✅ NEW

  useEffect(() => {
    fetchExpenses();
  }, [fromDate, toDate]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  /* ================= FETCH ================= */
  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/getAllExpensesByUserId?from_date=${formatDate(
          fromDate
        )}&to_date=${formatDate(toDate)}`,
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
        const apiData = json.data;

        setTotalIncome(parseFloat(apiData.totalIncome || 0));
        setTotalExpense(parseFloat(apiData.totalExpense || 0));
        setRemainingAmount(parseFloat(apiData.Remaining_Amount || 0));
        setTransactions(apiData.data || []);
      } else {
        Alert.alert("Error", json?.message || "Failed to load data");
      }
    } catch (error) {
      Alert.alert("Error", "Server not responding");
    } finally {
      setLoading(false);
      setRefreshing(false); // ✅ stop refresh loader
    }
  };

  /* ================= PULL TO REFRESH ================= */
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
  };

  /* ================= PIE DATA ================= */
  const pieData = [
    {
      name: "Income",
      amount: totalIncome,
      color: "#2ECC71",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Expense",
      amount: totalExpense,
      color: "#E74C3C",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  /* ================= CATEGORY TOTALS ================= */
  const categoryTotals = {};

  transactions.forEach((item) => {
    const expenseValue = parseFloat(item.Expenses);
    if (expenseValue > 0) {
      categoryTotals[item.category_name] =
        (categoryTotals[item.category_name] || 0) + expenseValue;
    }
  });

  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [{ data: Object.values(categoryTotals) }],
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4A90E2"]} // Android loader color
            tintColor="#4A90E2" // iOS loader color
          />
        }
      >
        <Text style={styles.header}>Financial Insights</Text>

        {/* Date Filter */}
        <View style={styles.dateCard}>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowFromPicker(true)}
          >
            <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
            <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold" }}>To</Text>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowToPicker(true)}
          >
            <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
            <Text style={styles.dateText}>{formatDate(toDate)}</Text>
          </TouchableOpacity>
        </View>

        {/* Date Pickers */}
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowFromPicker(Platform.OS === "ios");
              if (selectedDate) setFromDate(selectedDate);
            }}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowToPicker(Platform.OS === "ios");
              if (selectedDate) setToDate(selectedDate);
            }}
          />
        )}

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.incomeCard}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={styles.incomeText}>
              ₹ {totalIncome.toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <Text style={styles.cardTitle}>Total Expense</Text>
            <Text style={styles.expenseText}>
              ₹ {totalExpense.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* Pie Chart */}
        <Text style={styles.sectionTitle}>Income vs Expense</Text>
        <View style={styles.chartCard}>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Bar Chart */}
        <Text style={styles.sectionTitle}>Expense by Category</Text>
        <View style={styles.chartCard}>
          {Object.keys(categoryTotals).length > 0 ? (
            <BarChart
              data={barData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={20}
            />
          ) : (
            <Text style={{ textAlign: "center", padding: 20 }}>
              No expense data available
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;

/* ================= CHART CONFIG ================= */
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
  labelColor: () => "#333",
  strokeWidth: 2,
  barPercentage: 0.5,
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dateCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  incomeCard: {
    backgroundColor: "#E8F8F5",
    width: "48%",
    padding: 20,
    borderRadius: 20,
  },
  expenseCard: {
    backgroundColor: "#FDEDEC",
    width: "48%",
    padding: 20,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  incomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ECC71",
    marginTop: 5,
  },
  expenseText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E74C3C",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginBottom: 25,
  },
});