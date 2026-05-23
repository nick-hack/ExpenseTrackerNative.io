import React, {
  useState,
  useMemo,
} from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const SearchableDropdown = ({
  visible,
  onClose,
  data,
  onSelect,
  labelKey,
  title,
}) => {

  const [search,
    setSearch] =
      useState("");

  const filteredData =
    useMemo(() => {

      return data.filter(
        (item) =>
          item?.[labelKey]
            ?.toLowerCase()
            ?.includes(
              search.toLowerCase()
            )
      );

    }, [
      search,
      data,
    ]);

  return (

    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >

      <View
        style={styles.overlay}
      >

        <View
          style={styles.container}
        >

          {/* HEADER */}

          <View
            style={styles.header}
          >

            <Text
              style={styles.title}
            >
              Select {title}
            </Text>

            <TouchableOpacity
              onPress={onClose}
            >

              <MaterialIcons
                name="close"
                size={26}
                color="#333"
              />

            </TouchableOpacity>

          </View>

          {/* SEARCH */}

          <View
            style={styles.searchBox}
          >

            <MaterialIcons
              name="search"
              size={22}
              color="#777"
            />

            <TextInput
              placeholder={`Search ${title}`}
              value={search}
              onChangeText={
                setSearch
              }
              style={styles.input}
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
                  styles.item
                }
                onPress={() => {

                  onSelect(
                    item
                  );

                  onClose();
                }}
              >

                <Text
                  style={
                    styles.itemText
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
          />

        </View>

      </View>

    </Modal>
  );
};

export default SearchableDropdown;

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#fff",
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6FA",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    fontSize: 15,
  },

  item: {
    backgroundColor: "#F8FAFD",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },

});