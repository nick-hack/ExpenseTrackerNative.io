import { BASE_URL } from "../../Config";

export const insertExpense = async (token, payload) => {
  const response = await fetch(`${BASE_URL}/insertExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

export const getExpenses = async (token) => {
  const response = await fetch(`${BASE_URL}/getAllExpensesByUserId`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};