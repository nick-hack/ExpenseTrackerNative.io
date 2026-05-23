// services/api.js

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../Config";

// 🔥 COMMON HEADER
const getHeaders = async () => {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  return {
    "Content-Type":
      "application/json",

    Accept:
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
};

// 🔥 CATEGORY API
export const getCategoryByUserId =
  async () => {

    try {

      const headers =
        await getHeaders();

      const response =
        await fetch(
          `${BASE_URL}/getCategoryByUserId`,
          {
            method: "GET",
            headers,
          }
        );

      const json =
        await response.json();

      return json;

    } catch (error) {

      console.log(
        "Category API Error:",
        error
      );

      throw error;
    }
  };

// 🔥 CATEGORY TYPE API
export const getCatTypeByUserId =
  async () => {

    try {

      const headers =
        await getHeaders();

      const response =
        await fetch(
          `${BASE_URL}/getCatTypeByUserId`,
          {
            method: "GET",
            headers,
          }
        );

      const json =
        await response.json();

      return json;

    } catch (error) {

      console.log(
        "Category Type API Error:",
        error
      );

      throw error;
    }
  };

// 🔥 ACCOUNT API
export const getAccountByUserId =
  async () => {

    try {

      const headers =
        await getHeaders();

      const response =
        await fetch(
          `${BASE_URL}/getAccountByUserId`,
          {
            method: "GET",
            headers,
          }
        );

      const json =
        await response.json();

      return json;

    } catch (error) {

      console.log(
        "Account API Error:",
        error
      );

      throw error;
    }
  };