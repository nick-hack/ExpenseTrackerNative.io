import { BASE_URL } from "../../Config";

export const getCategories = async (token) => {
  const res = await fetch(`${BASE_URL}/getCategoryByUserId`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return res.json();
};

export const getAccounts = async (token) => {
  const res = await fetch(`${BASE_URL}/getAccountByUserId`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return res.json();
};

export const getCategoryTypes = async (token) => {
  const res = await fetch(`${BASE_URL}/getCatTypeByUserId`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return res.json();
};