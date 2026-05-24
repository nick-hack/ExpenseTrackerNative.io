import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../../Config';

const CategoryTypeList = ({ navigation }) => {

  const [categoryTypes, setCategoryTypes] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔥 Pull-to-refresh state
  const [refreshing, setRefreshing] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchCategoryTypes()
  }, [])

  /* ================= FETCH API ================= */
  const fetchCategoryTypes = async () => {
    try {
      setLoading(true)

      const token = await AsyncStorage.getItem('token')

      if (!token) {
        Alert.alert("Session Expired", "Please login again")
        navigation.replace("Login")
        return
      }

      const response = await fetch(`${BASE_URL}/getCatTypeByUserId`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      const text = await response.text()

      if (!text) {
        setCategoryTypes([])
        return
      }

      const json = JSON.parse(text)

      if (json.status === 200) {
        setCategoryTypes(json?.data?.count || [])
      } else {
        setCategoryTypes([])
      }

    } catch (error) {
      console.log("API Error:", error)
      Alert.alert("Error", "Server not responding")

    } finally {
      setLoading(false)
      setRefreshing(false) // 🔥 important for refresh
    }
  }

  /* ================= PULL TO REFRESH ================= */
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchCategoryTypes()
  }, [])

  /* ================= ADD LOCAL ================= */
  const handleAddType = () => {
    if (!typeName) return

    const newType = {
      id: Date.now(),
      type_name: typeName,
      descriptions: description
    }

    setCategoryTypes(prev => [newType, ...prev])

    setTypeName('')
    setDescription('')
    setModalVisible(false)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.type_name}</Text>
        <Text style={styles.cardDesc}>{item.descriptions}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Category Types</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={categoryTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}

          /* 🔥 PULL TO REFRESH ADDED */
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4A90E2"]}   // Android
              tintColor="#4A90E2"    // iOS
            />
          }

          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40 }}>
              No Category Types Found
            </Text>
          }
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Add Category Type</Text>

            <TextInput
              placeholder="Category Type Name"
              style={styles.input}
              value={typeName}
              onChangeText={setTypeName}
            />

            <TextInput
              placeholder="Description"
              style={[styles.input, { height: 80 }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddType}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default CategoryTypeList

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#2C3E50'
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  cardDesc: {
    fontSize: 13,
    color: '#777',
    marginTop: 4
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A90E2',
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20
  },

  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  input: {
    backgroundColor: '#F4F6FA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cancelBtn: {
    padding: 12
  },

  cancelText: {
    color: '#999',
    fontWeight: '600'
  },

  saveBtn: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold'
  }

})
