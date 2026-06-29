import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthContext } from "../contaxt/AuthContext";

/* SCREENS */
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import Register from "../screens/Register";

import Home from "../screens/Home";
import Insights from "../screens/Insights";
import Category from "../screens/Category";
import CategoryTypeList from "../screens/CategoryType/CategoryTypeList";
import AccountType from "../screens/AccountType/AccountType";

import Profile from "../screens/Profile";
import Reports from "../screens/Profiles/Reports";
import EditProfile from "../screens/EditProfile";
import AddExpense from "../screens/AddExpense";

import AboutApp from "../screens/Profiles/AboutApp";
import NotificationSettings from "../screens/Profiles/NotificationSettings";
import HelpSupport from "../screens/Profiles/HelpSupport";
import PrivacySecurity from "../screens/Profiles/PrivacySecurity";
import ChangePassword from "../screens/Profiles/ChangePassword";
import AccountSettings from "../screens/Profiles/AccountSettings";
import NotificationsScreen from "../components/NotificationsScreen";

import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import MobileLoginScreen from "../components/MobileLoginScreen";

/* NAV */
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ------------------ TABS ------------------ */
function MyTabs() {
  const insets = useSafeAreaInsets();

  const icons = {
    Home: "home",
    Insights: "insights",
    Category: "category",
    CategoryType: "view-module",
    AccountType: "account-balance",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
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
  );
}

/* ------------------ MAIN NAVIGATOR ------------------ */
export default function AppNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 🔥 AUTH FLOW */}
      {userToken == null ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          {/* MAIN APP */}
          <Stack.Screen name="Tabs" component={MyTabs} />

          {/* PROFILE SCREENS */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Reports" component={Reports} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="AddExpense" component={AddExpense} />

          <Stack.Screen name="AboutApp" component={AboutApp} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
          <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        </>
      )}

      {/* EXTRA */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="MobileLogin" component={MobileLoginScreen} />
      
    </Stack.Navigator>
  );
}