"use client";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebtSearch() {
  const [isSearched, setIsSearched] = useState(false);
  const [filteredCustomerDebt, setFilteredCustomerDebt] = useState([]);
  const [filteredSupplierDebt, setFilteredSupplierDebt] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = async () => {
    setIsSearched(true);
    try {
      if (!searchTerm) {
        return message.error("Không có từ khoá tìm kiếm");
      }
      const response = await axios.get(
        `${apiUrl}/api/debt/search?query=${searchTerm}`
      );
      setFilteredCustomerDebt(response.data.customer);
      setFilteredSupplierDebt(response.data.supplier);
    } catch (error) {
      return message.error("Lỗi tìm kiếm", error);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setIsSearched(false);
      setFilteredCustomerDebt([]);
      setFilteredSupplierDebt([]);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    isSearched,
    filteredCustomerDebt,
    filteredSupplierDebt,
    handleSearch,
    setIsSearched,
  };
}
