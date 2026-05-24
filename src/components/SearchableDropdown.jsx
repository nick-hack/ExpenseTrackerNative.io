import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const SearchableDropdown = ({
  title,
  data = [],
  selected,
  onSelect,
  labelKey,
  icon,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      (item?.[labelKey] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.label}>{title}</Text>

      {/* DROPDOWN BUTTON */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <View style={styles.dropdownLeft}>
          <View style={styles.iconBox}>
            <MaterialIcons name={icon} size={20} color="#4A90E2" />
          </View>

          <Text style={styles.dropdownText}>
            {selected ? selected?.[labelKey] : `Select ${title}`}
          </Text>
        </View>

        <MaterialIcons name="keyboard-arrow-down" size={28} color="#777" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {title}</Text>

              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setSearch("");
                }}
              >
                <MaterialIcons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={22} color="#777" />
              <TextInput
                placeholder={`Search ${title}`}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            {/* LIST */}
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) =>
                item?.id?.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                    setSearch("");
                  }}
                >
                  <Text style={styles.listItemText}>
                    {item?.[labelKey]}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchableDropdown;

/* SAME DESIGN STYLES (UNCHANGED) */
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 8,
  },

  dropdown: {
    backgroundColor: "#F8FAFD",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#E9EEF5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownLeft: { flexDirection: "row", alignItems: "center" },

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

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    justifyContent: "space-between",
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