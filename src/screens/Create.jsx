import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'

const categories = [
  { name: 'Food', icon: 'restaurant' },
  { name: 'Rent', icon: 'home' },
  { name: 'Travel', icon: 'flight' },
]

const accounts = [
  { name: 'GPay', icon: 'account-balance-wallet' },
  { name: 'PhonePe', icon: 'account-balance' },
  { name: 'Cash', icon: 'payments' },
  { name: 'Saving', icon: 'savings' },
]

const types = [
  { name: 'Income', color: '#2ECC71' },
  { name: 'Expense', color: '#E74C3C' },
]

const Create = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedType, setSelectedType] = useState(types[1])
  const [selectedAccount, setSelectedAccount] = useState(accounts[2])

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowPicker(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const handleAdd = () => {
    if (!title || !amount) return

    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount:
        selectedType.name === 'Expense'
          ? -Math.abs(parseInt(amount))
          : Math.abs(parseInt(amount)),
      category: selectedCategory.name,
      account: selectedAccount.name,
      date: date.toISOString()
    }

    navigation.navigate("Home", { newTransaction })
  }

  const formatDate = (d) => {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <LinearGradient
        colors={['#4A90E2', '#6C63FF']}
        style={styles.headerBox}
      >
        <Text style={styles.header}>Add Transaction</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Enter transaction title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="₹ 0.00"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        {/* Date Picker */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateCard}
          onPress={() => setShowPicker(true)}
        >
          <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Type */}
        <Text style={styles.label}>Transaction Type</Text>
        <View style={styles.segmentContainer}>
          {types.map((item) => {
            const isSelected = selectedType.name === item.name
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.segmentButton,
                  isSelected && { backgroundColor: item.color }
                ]}
                onPress={() => setSelectedType(item)}
              >
                <Text style={[
                  styles.segmentText,
                  isSelected && { color: '#fff' }
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.grid}>
          {categories.map((item) => {
            const isSelected = selectedCategory.name === item.name
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.card,
                  isSelected && styles.selectedCard
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={isSelected ? '#4A90E2' : '#888'}
                />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Account */}
        <Text style={styles.label}>Account</Text>
        <View style={styles.grid}>
          {accounts.map((item) => {
            const isSelected = selectedAccount.name === item.name
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.card,
                  isSelected && styles.selectedCard
                ]}
                onPress={() => setSelectedAccount(item)}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={isSelected ? '#4A90E2' : '#888'}
                />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAdd}>
        <MaterialIcons name="check" size={28} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F5F9'
  },

  headerBox: {
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 8,
    color: '#555'
  },

  input: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    fontSize: 16,
    elevation: 4
  },

  dateCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 4
  },

  dateText: {
    fontSize: 16,
    marginLeft: 10
  },

  segmentContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },

  segmentButton: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3
  },

  segmentText: {
    fontWeight: 'bold',
    color: '#333'
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: '#4A90E2'
  },

  cardText: {
    marginTop: 6,
    fontWeight: '600'
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  }

})
