import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../../Config";

import SearchableDropdown from "../components/SearchableDropdown";

/* SAFE NORMALIZER */
const normalize = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.count)) return res.data.count;
  return [];
};

const AddExpense = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) return navigation.replace("Login");

    await Promise.all([
      fetchCategories(token),
      fetchAccounts(token),
      fetchCategoryTypes(token),
    ]);

    setLoading(false);
  };

  const fetchCategories = async (token) => {
    try {
      const res = await fetch(`${BASE_URL}/getCategoryByUserId`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setCategories(normalize(json));
    } catch {
      setCategories([]);
    }
  };

  const fetchAccounts = async (token) => {
    try {
      const res = await fetch(`${BASE_URL}/getAccountByUserId`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setAccounts(normalize(json));
    } catch {
      setAccounts([]);
    }
  };

  const fetchCategoryTypes = async (token) => {
    try {
      const res = await fetch(`${BASE_URL}/getCatTypeByUserId`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setCategoryTypes(normalize(json));
    } catch {
      setCategoryTypes([]);
    }
  };

  /* ================= SAVE WITH INCOME/EXPENSE LOGIC ================= */
  const handleSave = async () => {
    if (!title || !amount || !selectedCategory || !selectedAccount || !selectedType) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    setSaving(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const amt = Number(amount);

      /* 🔥 KEY LOGIC HERE */
      const isIncome =
        (selectedType?.type_name || "").toLowerCase() === "income";

      const body = {
        CategoryId: selectedCategory?.id,
        CategoryTypeId: selectedType?.id,
        AccountTypeId: selectedAccount?.id,

        Budget: 0,

        Income: isIncome ? amt : 0,
        Expenses: isIncome ? 0 : amt,

        Expenses_date: new Date().toISOString().split("T")[0],
        reference_no: "REF" + Date.now(),

        Title: title,
      };

      const res = await fetch(`${BASE_URL}/insertExpenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (json?.status === 200) {
        Alert.alert("Success", "Expense Added");
        navigation.goBack();
      } else {
        Alert.alert("Error", json?.message || "Failed");
      }
    } catch (e) {
      Alert.alert("Error", "Server error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />

      <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.header}>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <Text style={styles.headerSub}>Track your daily spending</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="title" size={20} />
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          </View>

          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="currency-rupee" size={20} />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <SearchableDropdown
            title="Category"
            data={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            labelKey="category_name"
            icon="category"
            styles={styles}
          />

          <SearchableDropdown
            title="Category Type"
            data={categoryTypes}
            selected={selectedType}
            onSelect={setSelectedType}
            labelKey="type_name"
            icon="view-module"
            styles={styles}
          />

          <SearchableDropdown
            title="Account"
            data={accounts}
            selected={selectedAccount}
            onSelect={setSelectedAccount}
            labelKey="account_type"
            icon="account-balance-wallet"
            styles={styles}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleSave}>
        <LinearGradient colors={["#4A90E2", "#6C63FF"]} style={styles.fabInner}>
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <MaterialIcons name="check" size={32} color="#fff" />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddExpense;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF2F7" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    padding: 22,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  headerSub: { color: "#EAEAEA", marginTop: 5 },

  card: { backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 28 },

  label: { fontWeight: "700", marginBottom: 8, color: "#2C3E50" },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9EEF5",
    backgroundColor: "#F8FAFD",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  input: { flex: 1, marginLeft: 10, paddingVertical: 14 },

  fab: { position: "absolute", bottom: 30, right: 25 },

  fabInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});