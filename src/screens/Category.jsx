import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../Config";

const Category = ({ navigation }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Pull-to-refresh loader state
  const [refreshing, setRefreshing] = useState(false);

  /* ================= FIRST LOAD ================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= AUTO REFRESH ON FOCUS ================= */
  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  /* ================= API ================= */
  const fetchCategories = async () => {

    try {

      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Session Expired", "Please login again");
        navigation.replace("Login");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/getCategoryByUserId`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const jsonData = await response.json();

      if (response.ok && jsonData?.status === 200) {
        setCategories(jsonData?.data?.count || []);
      } else {
        setCategories([]);
      }

    } catch (error) {
      console.log("ERROR:", error);
      Alert.alert("Error", "Unable to load data");

    } finally {
      setLoading(false);
      setRefreshing(false); // 🔥 important
    }
  };

  /* ================= PULL TO REFRESH ================= */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategories();
  }, []);

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.iconBox}>
        <MaterialIcons name="category" size={26} color="#4A90E2" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item?.category_name}</Text>
        <Text style={styles.type}>{item?.type_name}</Text>
      </View>

    </View>
  );

  /* ================= LOADER ================= */
  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item, index) =>
          item?.id?.toString() || index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}

        /* 🔥 PULL TO REFRESH */
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4A90E2"]}   // Android
            tintColor="#4A90E2"    // iOS
          />
        }

        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            No categories found
          </Text>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddCategory")}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Category;

/* ================= STYLES ================= */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  iconBox: {
    backgroundColor: "#EAF2FF",
    padding: 10,
    borderRadius: 15,
    marginRight: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  type: {
    fontSize: 13,
    color: "#888",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4A90E2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});