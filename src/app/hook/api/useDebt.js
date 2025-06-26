"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebt() {
  const [debt, setDebt] = useState([]);
  const [supplierDebt, setSupplierDebt] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchDebt = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/debt`);
      setDebt(response.data);
    } catch (error) {
      console.error("Lỗi lấy công nợ", error);
    }
  };

  const fetchSupplierDebt = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/debt/get/supplierDebt`);
      setSupplierDebt(response.data);
    } catch (error) {
      console.error("Lỗi lấy công nợ", error);
    }
  };

  useEffect(() => {
    fetchDebt();
    fetchSupplierDebt();
  }, []);

  return { debt, fetchDebt, supplierDebt, fetchSupplierDebt };
}
