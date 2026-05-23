import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../Config";

const screenWidth = Dimensions.get("window").width;

const Reports = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------------- SAFE NUMBER FUNCTION ---------------- */
  const safeNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  /* ---------------- API CALL ---------------- */
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

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

      if (json?.status === 200 && json?.data?.data) {
        const apiData = json.data;

        const formatted = apiData.data.map((item) => ({
          id: item.id?.toString() || Math.random().toString(),
          category: item.category_name || "Unknown",
          account: item.account_name || "Unknown",
          income: safeNumber(item.Income),
          expense: safeNumber(item.Expenses),
          date: item.Expenses_date
            ? new Date(item.Expenses_date)
            : new Date(),
        }));

        setTransactions(formatted);
        setFilteredData(formatted);
        setTotalIncome(safeNumber(apiData.totalIncome));
        setTotalExpense(safeNumber(apiData.totalExpense));
      } else {
        Alert.alert("Error", json?.message || "Failed to load data");
      }
    } catch (err) {
      Alert.alert("Error", "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- MONTHLY DATA ---------------- */
  const monthlyData = useMemo(() => {
    const grouped = {};

    filteredData.forEach((item) => {
      const month = item.date.toLocaleString("default", {
        month: "short",
      });

      if (!grouped[month]) grouped[month] = 0;

      grouped[month] += item.income - item.expense;
    });

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          data:
            Object.values(grouped).length > 0
              ? Object.values(grouped)
              : [0],
        },
      ],
    };
  }, [filteredData]);

  /* ---------------- PIE DATA (Category Wise) ---------------- */
  const pieData = useMemo(() => {
    const grouped = {};

    filteredData.forEach((item) => {
      const value = item.income > 0 ? item.income : item.expense;
      grouped[item.category] =
        (grouped[item.category] || 0) + value;
    });

    const colors = [
      "#4A90E2",
      "#2ECC71",
      "#E74C3C",
      "#F39C12",
      "#9B59B6",
      "#1ABC9C",
    ];

    const result = Object.keys(grouped).map((key, index) => ({
      name: key,
      amount: grouped[key],
      color: colors[index % colors.length],
      legendFontColor: darkMode ? "#fff" : "#000",
      legendFontSize: 12,
    }));

    return result.length > 0
      ? result
      : [
          {
            name: "No Data",
            amount: 1,
            color: "#ccc",
            legendFontColor: darkMode ? "#fff" : "#000",
            legendFontSize: 12,
          },
        ];
  }, [filteredData, darkMode]);

  /* ---------------- BAR DATA ---------------- */
  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome || 0, totalExpense || 0],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: darkMode ? "#1E1E1E" : "#fff",
    backgroundGradientTo: darkMode ? "#1E1E1E" : "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) =>
      darkMode
        ? `rgba(255,255,255,${opacity})`
        : `rgba(74,144,226,${opacity})`,
    labelColor: () => (darkMode ? "#fff" : "#000"),
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#F4F6FA" },
      ]}
    >
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.topRow}>
              <Text
                style={[
                  styles.title,
                  { color: darkMode ? "#fff" : "#000" },
                ]}
              >
                Reports 📊
              </Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>

            <View style={styles.summaryRow}>
              <Text style={{ color: "#2ECC71" }}>
                Income ₹ {totalIncome}
              </Text>
              <Text style={{ color: "#E74C3C" }}>
                Expense ₹ {totalExpense}
              </Text>
            </View>

            <Text style={styles.chartTitle}>Monthly Overview</Text>
            <LineChart
              data={monthlyData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              bezier
            />

            <Text style={styles.chartTitle}>Income vs Expense</Text>
            <BarChart
              data={barData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
            />

            <Text style={styles.chartTitle}>Category Distribution</Text>
            <PieChart
              data={pieData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              absolute
            />

             <View style={styles.exportRow}>
              <TouchableOpacity style={styles.exportBtn} onPress={() => Alert.alert("Export", "PDF export not implemented")}>
                <Text style={styles.btnText}>Export PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.exportBtn} onPress={() => Alert.alert("Export", "Excel export not implemented")}>
                <Text style={styles.btnText}>Export Excel</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.chartTitle}>Detailed Report</Text>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: darkMode ? "#1E1E1E" : "#fff" },
            ]}
          >
            <Text style={{ color: darkMode ? "#fff" : "#000" }}>
              {item.category} ({item.account})
            </Text>
            <Text
              style={{
                color:
                  item.income > 0 ? "#2ECC71" : "#E74C3C",
              }}
            >
              ₹ {item.income > 0 ? item.income : item.expense}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  chartTitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
  card: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
    exportRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
  exportBtn: { backgroundColor: "#4A90E2", padding: 12, borderRadius: 12, width: "48%", alignItems: "center" },

});