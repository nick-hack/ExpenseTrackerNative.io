import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Modal
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const Home = ({ navigation, route }) => {

  const employeeName = "Rahul Sharma"

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const [notificationVisible, setNotificationVisible] = useState(false)

  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Monthly Salary', amount: 50000, category: 'salary' },
    { id: '2', title: 'House Rent', amount: -12000, category: 'rent' },
    { id: '3', title: 'Amazon Refund', amount: 1500, category: 'refund' },
  ])

  useEffect(() => {
    if (route?.params?.newTransaction) {
      setTransactions(prev => [
        route.params.newTransaction,
        ...prev
      ])
    }
  }, [route?.params?.newTransaction])

  const totalIncome = transactions
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)

  const totalExpense = transactions
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0)

  const totalBalance = totalIncome + totalExpense

  const formatCurrency = (amount) =>
    `₹ ${Math.abs(amount).toLocaleString('en-IN')}`

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'salary':
        return 'payments'
      case 'rent':
        return 'home'
      case 'refund':
        return 'assignment-return'
      default:
        return 'account-balance-wallet'
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.leftSection}>

        <TouchableOpacity
          style={[
            styles.iconCircle,
            { backgroundColor: item.amount < 0 ? '#E74C3C' : '#2ECC71' }
          ]}
          onPress={() =>
            navigation.navigate("TransactionDetails", { transaction: item })
          }
        >
          <MaterialIcons
            name={getCategoryIcon(item.category)}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{today}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          { color: item.amount < 0 ? '#E74C3C' : '#2ECC71' }
        ]}
      >
        {item.amount < 0 ? "- " : "+ "}
        {formatCurrency(item.amount)}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* NAVBAR */}
      <View style={styles.navbar}>

        <Text style={styles.navTitle}>Finance Manager</Text>

        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => setNotificationVisible(true)}>
            <MaterialIcons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="account-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>
            Hello, {employeeName} 👋
          </Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ₹ {totalBalance.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Income & Expense */}
        <View style={styles.summaryContainer}>
          <View style={styles.incomeCard}>
            <MaterialIcons name="trending-up" size={22} color="#2ECC71" />
            <Text style={styles.cardTitle}>Income</Text>
            <Text style={styles.incomeText}>
              ₹ {totalIncome.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <MaterialIcons name="trending-down" size={22} color="#E74C3C" />
            <Text style={styles.cardTitle}>Expenses</Text>
            <Text style={styles.expenseText}>
              ₹ {Math.abs(totalExpense).toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Create")}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Notification Modal */}
      <Modal
        visible={notificationVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationBox}>
            <Text style={styles.notificationTitle}>Notifications</Text>

            <Text style={styles.notificationText}>
              💰 Salary credited successfully
            </Text>

            <Text style={styles.notificationText}>
              📊 Monthly report is ready
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setNotificationVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: '#4A90E2'
  },

  navbar: {
    height: 60,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  navIcons: {
    flexDirection: 'row',
    gap: 20
  },

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50'
  },

  dateText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4
  },

  balanceCard: {
    backgroundColor: '#4A90E2',
    padding: 30,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 6
  },

  balanceLabel: {
    color: '#fff',
    fontSize: 16
  },

  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  incomeCard: {
    backgroundColor: '#E8F8F5',
    width: '48%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center'
  },

  expenseCard: {
    backgroundColor: '#FDEDEC',
    width: '48%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center'
  },

  cardTitle: {
    marginTop: 5,
    color: '#7F8C8D'
  },

  incomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginTop: 5
  },

  expenseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 5
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },

  transactionCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: '600'
  },

  transactionDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A90E2',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  notificationBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    elevation: 10
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  notificationText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555'
  },

  closeBtn: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15
  }

})
