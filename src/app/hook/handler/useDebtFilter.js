"use client";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebtFilter({ setIsSearched }) {
  const [date, setDate] = useState("");
  const [filteredCustomerByDate, setFilteredCustomerByDate] = useState([]);
  const [filteredSupplierByDate, setFilteredSupplierByDate] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleFilterByDate = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/debt/filter/bydate?date=${date}`
      );
      setFilteredCustomerByDate(response.data.customer);
      setFilteredSupplierByDate(response.data.supplier);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra!", error);
    }
  };

  useEffect(() => {
    if (!date) {
      setIsSearched(false);
      setFilteredCustomerByDate([]);
      setFilteredSupplierByDate([]);
    }
  }, [date]);

  return {
    date,
    setDate,
    filteredCustomerByDate,
    filteredSupplierByDate,
    handleFilterByDate,
  };
}
