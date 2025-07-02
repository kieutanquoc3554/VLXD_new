"use client";

import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const API = `${apiUrl}/api`;

export const fetchCategories = async () => {
  await axios.get(`${API}/category`);
};
