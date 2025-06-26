"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDetailDebt(selectedDebt) {
  const [detailDebt, setDetailDebt] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchViewDetails = async () => {
    try {
      if (selectedDebt) {
        const response = await axios.get(
          `${apiUrl}/api/debt/${selectedDebt.order_id}`
        );
        setDetailDebt(response.data);
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy chi tiết công nợ", error);
    }
  };

  useEffect(() => {
    fetchViewDetails();
  }, [selectedDebt]);

  return { detailDebt, fetchViewDetails };
}
