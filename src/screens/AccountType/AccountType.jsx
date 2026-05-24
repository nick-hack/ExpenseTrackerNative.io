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
import { BASE_URL } from "../../../Config";

const AccountType = ({ navigation }) => {

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔥 Pull-to-refresh state
  const [refreshing, setRefreshing] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)
  const [accountType, setAccountType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  /* ================= FETCH API ================= */
  const fetchAccounts = async () => {
    try {
      setLoading(true)

      const token = await AsyncStorage.getItem('token')

      if (!token) {
        Alert.alert("Session Expired", "Please login again")
        navigation.replace("Login")
        return
      }

      const response = await fetch(`${BASE_URL}/getAccountByUserId`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      const text = await response.text()

      if (!text) {
        setAccounts([])
        return
      }

      const json = JSON.parse(text)

      console.log("Account API Response:", json)

      if (json.status === 200) {
        setAccounts(json?.data?.count || [])
      } else {
        setAccounts([])
      }

    } catch (error) {
      console.log("API Error:", error)
      Alert.alert("Error", "Server not responding")

    } finally {
      setLoading(false)
      setRefreshing(false) // 🔥 important
    }
  }

  /* ================= PULL TO REFRESH ================= */
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchAccounts()
  }, [])

  /* ================= ADD LOCAL (UI ONLY) ================= */
  const handleAddAccount = () => {
    if (!accountType || !fromDate || !toDate) return

    const newAccount = {
      id: Date.now(),
      account_type: accountType,
      from_date: fromDate,
      to_date: toDate
    }

    setAccounts(prev => [newAccount, ...prev])

    setAccountType('')
    setFromDate('')
    setToDate('')
    setModalVisible(false)
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('en-GB')
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.account_type}</Text>
        <Text style={styles.cardDate}>
          {formatDate(item.created_at)}
        </Text>
      </View>

      <MaterialIcons
        name="account-balance-wallet"
        size={26}
        color="#4A90E2"
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Account Types</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}

          /* 🔥 PULL TO REFRESH ADDED */
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4A90E2"]}
              tintColor="#4A90E2"
            />
          }

          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40 }}>
              No Accounts Found
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

            <Text style={styles.modalTitle}>Add Account Type</Text>

            <TextInput
              placeholder="Account Type"
              style={styles.input}
              value={accountType}
              onChangeText={setAccountType}
            />

            <TextInput
              placeholder="From Date (YYYY-MM-DD)"
              style={styles.input}
              value={fromDate}
              onChangeText={setFromDate}
            />

            <TextInput
              placeholder="To Date (YYYY-MM-DD)"
              style={styles.input}
              value={toDate}
              onChangeText={setToDate}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddAccount}
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

export default AccountType

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
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50'
  },

  cardDate: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 5
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
    marginBottom: 20,
    color: '#2C3E50'
  },

  input: {
    backgroundColor: '#F4F6FA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  buttonRow: {
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
