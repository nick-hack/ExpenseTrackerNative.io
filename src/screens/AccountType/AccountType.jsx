import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const AccountType = () => {

  const [accounts, setAccounts] = useState([
    {
      id: '1',
      accountType: 'Savings',
      fromDate: '01-01-2025',
      toDate: '31-12-2025'
    }
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [accountType, setAccountType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleAddAccount = () => {
    if (!accountType || !fromDate || !toDate) return

    const newAccount = {
      id: Date.now().toString(),
      accountType,
      fromDate,
      toDate
    }

    setAccounts([...accounts, newAccount])

    setAccountType('')
    setFromDate('')
    setToDate('')
    setModalVisible(false)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.accountType}</Text>
        <Text style={styles.cardDate}>
          {item.fromDate}  →  {item.toDate}
        </Text>
      </View>
      <MaterialIcons name="account-balance-wallet" size={26} color="#4A90E2" />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Account Types</Text>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
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
              placeholder="From Date (DD-MM-YYYY)"
              style={styles.input}
              value={fromDate}
              onChangeText={setFromDate}
            />

            <TextInput
              placeholder="To Date (DD-MM-YYYY)"
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
