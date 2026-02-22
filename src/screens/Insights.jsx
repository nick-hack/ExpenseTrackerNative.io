import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PieChart, BarChart } from 'react-native-chart-kit'
import { MaterialIcons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width

const Insights = () => {

  const [fromDate, setFromDate] = useState("01 April 2025")
  const [toDate, setToDate] = useState("31 march 2026")

  // Sample Transactions
  const transactions = [
    { category: 'Food', amount: -4000 },
    { category: 'Rent', amount: -12000 },
    { category: 'Travel', amount: -3000 },
    { category: 'Salary', amount: 50000 },
    { category: 'Freelance', amount: 10000 },
  ]

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const pieData = [
    {
      name: 'Income',
      amount: income,
      color: '#2ECC71',
      legendFontColor: '#333',
      legendFontSize: 14
    },
    {
      name: 'Expense',
      amount: expense,
      color: '#E74C3C',
      legendFontColor: '#333',
      legendFontSize: 14
    }
  ]

  const categoryTotals = {}

  transactions.forEach(t => {
    if (t.amount < 0) {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Math.abs(t.amount)
    }
  })

  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals)
      }
    ]
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>Financial Insights</Text>

        {/* Date Filter Card */}
        <View style={styles.dateCard}>
          <View style={styles.dateBox}>
            <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
            <Text style={styles.dateText}>{fromDate}</Text>
          </View>

          <Text style={{ fontWeight: 'bold' }}>To</Text>

          <View style={styles.dateBox}>
            <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
            <Text style={styles.dateText}>{toDate}</Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.incomeCard}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={styles.incomeText}>₹ {income}</Text>
          </View>

          <View style={styles.expenseCard}>
            <Text style={styles.cardTitle}>Total Expense</Text>
            <Text style={styles.expenseText}>₹ {expense}</Text>
          </View>
        </View>

        {/* Pie Chart */}
        <Text style={styles.sectionTitle}>Income vs Expense</Text>
        <View style={styles.chartCard}>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Bar Chart */}
        <Text style={styles.sectionTitle}>Expense by Category</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={20}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Insights


const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
  labelColor: () => '#333',
  strokeWidth: 2,
  barPercentage: 0.5,
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 20
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50'
  },

  dateCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3
  },

  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  dateText: {
    marginLeft: 5
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  incomeCard: {
    backgroundColor: '#E8F8F5',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    elevation: 3
  },

  expenseCard: {
    backgroundColor: '#FDEDEC',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    elevation: 3
  },

  cardTitle: {
    fontSize: 14,
    color: '#7F8C8D'
  },

  incomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginTop: 5
  },

  expenseText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 5
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50'
  },

  chartCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 3
  }

})
