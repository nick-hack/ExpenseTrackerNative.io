import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const Profile = ({ navigation }) => {

  const user = {
    name: "Rahul Sharma",
    email: "rahul@email.com",
    income: 75000,
    expense: 32000
  }

  const balance = user.income - user.expense

  const MenuItem = ({ icon, title, onPress, color = "#2C3E50" }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={22} color="#4A90E2" />
        </View>
        <Text style={[styles.menuText, { color }]}>{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={22} color="#999" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12"
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="edit" size={18} color="#fff" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={24} color="#2ECC71" />
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statValue, { color: '#2ECC71' }]}>
              ₹ {user.income.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="trending-down" size={24} color="#E74C3C" />
            <Text style={styles.statLabel}>Expense</Text>
            <Text style={[styles.statValue, { color: '#E74C3C' }]}>
              ₹ {user.expense.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="account-balance-wallet" size={24} color="#4A90E2" />
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statValue, { color: '#4A90E2' }]}>
              ₹ {balance.toLocaleString('en-IN')}
            </Text>
          </View>

        </View>

        {/* Settings Section */}
        <View style={styles.menuContainer}>

          <MenuItem icon="person" title="Account Settings" />
          <MenuItem icon="lock" title="Change Password" />
          <MenuItem icon="notifications" title="Notification Settings" />
          <MenuItem icon="security" title="Privacy & Security" />
          <MenuItem icon="help-outline" title="Help & Support" />
          <MenuItem icon="info-outline" title="About App" />

          <MenuItem
            icon="logout"
            title="Logout"
            color="#E74C3C"
            onPress={() => navigation.replace("Login")}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: '#4A90E2'
  },

  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#4A90E2',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 15
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },

  email: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 15
  },

  editBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    gap: 5
  },

  editText: {
    color: '#fff',
    fontWeight: '600'
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F4F6FA',
    marginTop: -20,
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  statCard: {
    alignItems: 'center'
  },

  statLabel: {
    marginTop: 6,
    fontSize: 13,
    color: '#7F8C8D'
  },

  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4
  },

  menuContainer: {
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20,
    paddingBottom: 30
  },

  menuItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  menuText: {
    fontSize: 15,
    fontWeight: '600'
  }

})
