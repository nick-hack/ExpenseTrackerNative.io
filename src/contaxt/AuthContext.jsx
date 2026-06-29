import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // check login on app start
  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
    } catch (e) {
      setUserToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // LOGIN
  const login = async (token) => {
    await AsyncStorage.setItem("token", token);
    setUserToken(token);
  };

  // LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};