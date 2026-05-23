import { BASE_URL } from "../../Config";

export const insertExpense = async (token, body) => {
  const res = await fetch(`${BASE_URL}/insertExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return res.json();
};