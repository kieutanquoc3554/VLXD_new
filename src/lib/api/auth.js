"use client";
import axios from "axios";

const API_URL = `/api/auth`;

const login = async ({ email, password }) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
};

export default { login, getCurrentUser };
