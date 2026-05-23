import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Insights from '../screens/Insights'
import Profile from '../screens/Profile'
import Create from '../screens/Create'
import Category from '../screens/Category'
import AddCategory from '../screens/AddCategory'
import CategoryTypeList from '../screens/CategoryType/CategoryTypeList'
import AccountType from '../screens/AccountType/AccountType'
import Reports from '../screens/Profiles/Reports'
import EditProfile from '../screens/EditProfile'
import AddExpense from '../screens/AddExpense'


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

/* ------------------ BOTTOM TABS ------------------ */
function MyTabs() {
  const insets = useSafeAreaInsets()

  const icons = {
    Home: 'home',
    Insights: 'insights',
    Category: 'category',
    CategoryType: 'view-module',
    AccountType: 'account-balance',
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name={icons[route.name]}
            size={focused ? 26 : 22}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="CategoryType" component={CategoryTypeList} />
      <Tab.Screen name="AccountType" component={AccountType} />
    </Tab.Navigator>
  )
}

/* ------------------ STACK NAVIGATOR ------------------ */
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* Auth Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />

      {/* Main Tabs */}
      <Stack.Screen name="Tabs" component={MyTabs} />

      {/* Profile Buttons */}
      <Stack.Screen name="Reports" component={Reports} />

      {/* Extra Screens */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="CategoryTypeList" component={CategoryTypeList} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
    </Stack.Navigator>
  )
}