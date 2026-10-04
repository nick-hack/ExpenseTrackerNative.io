import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from "./src/components/NotificationContext";
import { AuthProvider } from "./src/contaxt/AuthContext";
import { navigationRef } from "./src/navigation/RootNavigation";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
     <AuthProvider>
   <NotificationProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </NotificationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
