import React, {
  useEffect,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Modal,
  FlatList,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  MaterialIcons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  LinearGradient,
} from "expo-linear-gradient";

import { BASE_URL } from "../../Config";

/* ================================================= */
/* ============= SEARCHABLE DROPDOWN =============== */
/* ================================================= */

const SearchableDropdown = ({
  title,
  data,
  selected,
  onSelect,
  labelKey,
  icon,
}) => {

  const [visible, setVisible] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredData =
    data.filter((item) =>
      (
        item?.[labelKey] || ""
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <View style={{ marginTop: 18 }}>

      <Text style={styles.label}>
        {title}
      </Text>

      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() =>
          setVisible(true)
        }
      >

        <View
          style={styles.dropdownLeft}
        >

          <View
            style={styles.iconBox}
          >

            <MaterialIcons
              name={icon}
              size={20}
              color="#4A90E2"
            />

          </View>

          <Text
            style={styles.dropdownText}
          >

            {selected
              ? selected?.[
                  labelKey
                ]
              : `Select ${title}`}

          </Text>

        </View>

        <MaterialIcons
          name="keyboard-arrow-down"
          size={28}
          color="#777"
        />

      </TouchableOpacity>

      {/* ================= MODAL ================= */}

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>

            {/* HEADER */}

            <View
              style={styles.modalHeader}
            >

              <Text
                style={
                  styles.modalTitle
                }
              >
                Select {title}
              </Text>

              <TouchableOpacity
                onPress={() => {

                  setVisible(
                    false
                  );

                  setSearch("");
                }}
              >

                <MaterialIcons
                  name="close"
                  size={28}
                  color="#333"
                />

              </TouchableOpacity>

            </View>

            {/* SEARCH */}

            <View
              style={
                styles.searchContainer
              }
            >

              <MaterialIcons
                name="search"
                size={22}
                color="#777"
              />

              <TextInput
                placeholder={`Search ${title}`}
                style={
                  styles.searchInput
                }
                value={search}
                onChangeText={
                  setSearch
                }
              />

            </View>

            {/* LIST */}

            <FlatList
              data={filteredData}
              keyExtractor={(
                item,
                index
              ) =>
                item?.id?.toString() ||
                index.toString()
              }
              showsVerticalScrollIndicator={
                false
              }
              renderItem={({
                item,
              }) => (

                <TouchableOpacity
                  style={
                    styles.listItem
                  }
                  onPress={() => {

                    onSelect(item);

                    setVisible(
                      false
                    );

                    setSearch("");
                  }}
                >

                  <Text
                    style={
                      styles.listItemText
                    }
                  >

                    {
                      item?.[
                        labelKey
                      ]
                    }

                  </Text>

                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (

                <View
                  style={{
                    padding: 30,
                    alignItems:
                      "center",
                  }}
                >

                  <Text
                    style={{
                      color: "#999",
                    }}
                  >
                    No Data Found
                  </Text>

                </View>
              )}
            />

          </View>

        </View>

      </Modal>

    </View>
  );
};

/* ================================================= */
/* ================= ADD EXPENSE =================== */
/* ================================================= */

const AddExpense = ({
  navigation,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [description,
    setDescription] =
      useState("");

  const [selectedCategory,
    setSelectedCategory] =
      useState(null);

  const [selectedAccount,
    setSelectedAccount] =
      useState(null);

  const [selectedType,
    setSelectedType] =
      useState(null);

  const [categories,
    setCategories] =
      useState([]);

  const [accounts,
    setAccounts] =
      useState([]);

  const [categoryTypes,
    setCategoryTypes] =
      useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  /* ================================================= */
  /* ================= LOAD DATA ==================== */
  /* ================================================= */

  const loadAllData =
    async () => {

    try {

      setLoading(true);

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      if (!token) {

        navigation.replace(
          "Login"
        );

        return;
      }

      await Promise.all([
        fetchCategories(token),
        fetchAccounts(token),
        fetchCategoryTypes(token),
      ]);

    } catch (error) {

      console.log(
        "LOAD ERROR =>",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /* ================================================= */
  /* ================= CATEGORY API ================= */
  /* ================================================= */

  const fetchCategories =
    async (token) => {

    try {

      const response =
        await fetch(
          `${BASE_URL}/getCategoryByUserId`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );

      const json =
        await response.json();

      if (
        response.ok &&
        json?.status === 200
      ) {

        setCategories(
          json?.data?.count || []
        );
      }

    } catch (error) {

      console.log(
        "CATEGORY ERROR =>",
        error
      );
    }
  };

  /* ================================================= */
  /* ================= ACCOUNT API ================== */
  /* ================================================= */

  const fetchAccounts =
    async (token) => {

    try {

      const response =
        await fetch(
          `${BASE_URL}/getAccountByUserId`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );

      const json =
        await response.json();

      if (
        response.ok &&
        json?.status === 200
      ) {

        setAccounts(
          json?.data?.count || []
        );
      }

    } catch (error) {

      console.log(
        "ACCOUNT ERROR =>",
        error
      );
    }
  };

  /* ================================================= */
  /* ============== CATEGORY TYPE API =============== */
  /* ================================================= */

  const fetchCategoryTypes =
    async (token) => {

    try {

      const response =
        await fetch(
          `${BASE_URL}/getCatTypeByUserId`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );

      const json =
        await response.json();

      if (
        response.ok &&
        json?.status === 200
      ) {

        setCategoryTypes(
          json?.data?.count || []
        );
      }

    } catch (error) {

      console.log(
        "TYPE ERROR =>",
        error
      );
    }
  };

  /* ================================================= */
  /* ================= SAVE EXPENSE ================= */
  /* ================================================= */

  const handleSave =
    async () => {

    if (
      !title ||
      !amount ||
      !selectedCategory ||
      !selectedAccount ||
      !selectedType
    ) {

      Alert.alert(
        "Validation",
        "Please fill all fields"
      );

      return;
    }

    try {

      setSaving(true);

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const requestBody = {

        Title: title,

        Amount: amount,

        Description:
          description,

        category_id:
          selectedCategory?.id,

        account_id:
          selectedAccount?.id,

        category_type_id:
          selectedType?.id,
      };

      const response =
        await fetch(
          `${BASE_URL}/insertExpense`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              requestBody
            ),
          }
        );

      const json =
        await response.json();

      if (
        response.ok &&
        json?.status === 200
      ) {

        Alert.alert(
          "Success",
          "Expense Added Successfully"
        );

        navigation.goBack();

      } else {

        Alert.alert(
          "Error",
          json?.message ||
            "Unable to save expense"
        );
      }

    } catch (error) {

      console.log(
        "SAVE ERROR =>",
        error
      );

      Alert.alert(
        "Error",
        "Something went wrong"
      );

    } finally {

      setSaving(false);
    }
  };

  /* ================================================= */
  /* ================= LOADER ======================= */
  /* ================================================= */

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#4A90E2"
        />

      </View>
    );
  }

  /* ================================================= */
  /* ================= UI =========================== */
  /* ================================================= */

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        backgroundColor="#4A90E2"
        barStyle="light-content"
      />

      {/* HEADER */}

      <LinearGradient
        colors={[
          "#4A90E2",
          "#6C63FF",
        ]}
        style={styles.header}
      >

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            navigation.goBack()
          }
        >

          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Add Expense
        </Text>

        <Text style={styles.headerSub}>
          Track your daily spending
        </Text>

      </LinearGradient>

      {/* BODY */}

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >

        <View style={styles.card}>

          {/* TITLE */}

          <Text style={styles.label}>
            Expense Title
          </Text>

          <View
            style={styles.inputContainer}
          >

            <MaterialIcons
              name="title"
              size={20}
              color="#4A90E2"
            />

            <TextInput
              placeholder="Enter expense title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

          </View>

          {/* AMOUNT */}

          <Text style={styles.label}>
            Amount
          </Text>

          <View
            style={styles.inputContainer}
          >

            <MaterialIcons
              name="currency-rupee"
              size={20}
              color="#2ECC71"
            />

            <TextInput
              placeholder="Enter amount"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

          </View>

          {/* DESCRIPTION */}

          <Text style={styles.label}>
            Description
          </Text>

          <View
            style={[
              styles.inputContainer,
              {
                height: 110,
                alignItems:
                  "flex-start",
              },
            ]}
          >

            <MaterialIcons
              name="description"
              size={20}
              color="#FF9800"
              style={{
                marginTop: 14,
              }}
            />

            <TextInput
              placeholder="Enter description"
              style={[
                styles.input,
                {
                  height: 100,
                },
              ]}
              multiline
              value={description}
              onChangeText={
                setDescription
              }
            />

          </View>

          {/* CATEGORY */}

          <SearchableDropdown
            title="Category"
            selected={
              selectedCategory
            }
            data={categories}
            onSelect={
              setSelectedCategory
            }
            labelKey="category_name"
            icon="category"
          />

          {/* CATEGORY TYPE */}

          <SearchableDropdown
            title="Category Type"
            selected={
              selectedType
            }
            data={categoryTypes}
            onSelect={
              setSelectedType
            }
            labelKey="type_name"
            icon="view-module"
          />

          {/* ACCOUNT */}

          <SearchableDropdown
            title="Account"
            selected={
              selectedAccount
            }
            data={accounts}
            onSelect={
              setSelectedAccount
            }
            labelKey="account_type"
            icon="account-balance-wallet"
          />

        </View>

      </ScrollView>

      {/* SAVE BUTTON */}

      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.9}
        onPress={handleSave}
        disabled={saving}
      >

        <LinearGradient
          colors={[
            "#4A90E2",
            "#6C63FF",
          ]}
          style={styles.fabGradient}
        >

          {saving ? (

            <ActivityIndicator
              color="#fff"
            />

          ) : (

            <MaterialIcons
              name="check"
              size={32}
              color="#fff"
            />
          )}

        </LinearGradient>

      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AddExpense;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: 20,
    paddingBottom: 35,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 18,
  },

  headerSub: {
    color: "#EAEAEA",
    marginTop: 5,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 28,
    padding: 20,
    elevation: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
  },

  inputContainer: {
    backgroundColor: "#F8FAFD",
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#E9EEF5",
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 10,
    fontSize: 15,
    color: "#2C3E50",
  },

  dropdown: {
    backgroundColor: "#F8FAFD",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#E9EEF5",
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#2C3E50",
    fontWeight: "600",
  },

  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    elevation: 10,
  },

  fabGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ================= MODAL ================= */

  modalContainer: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    fontSize: 15,
  },

  listItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  listItemText: {
    fontSize: 15,
    color: "#2C3E50",
    fontWeight: "500",
  },

});