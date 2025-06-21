"use client";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async ({ email, password }) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export default { login, getCurrentUser };
