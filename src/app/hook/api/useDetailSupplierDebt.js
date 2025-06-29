"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDetailSupplierDebt(selectedSupplierDebt) {
  const [detailSupplierDebt, setDetailSupplierDebt] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchSupplierDebtDetail = async () => {
    try {
      if (selectedSupplierDebt?.id) {
        const response = await axios.get(
          `/api/debt/supplierDebt/${selectedSupplierDebt.id}`
        );
        setDetailSupplierDebt(response.data);
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy chi tiết công nợ", error);
    }
  };
  useEffect(() => {
    fetchSupplierDebtDetail();
  }, [selectedSupplierDebt]);

  return { detailSupplierDebt, fetchSupplierDebtDetail };
}
