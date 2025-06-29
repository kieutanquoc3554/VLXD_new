"use client";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebtFilter({ setIsSearched }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [filteredCustomerByDate, setFilteredCustomerByDate] = useState([]);
  const [filteredSupplierByDate, setFilteredSupplierByDate] = useState([]);
  const [filteredCustomerByStatus, setFilteredCustomerByStatus] = useState([]);
  const [filteredSupplierByStatus, setFilteredSupplierByStatus] = useState([]);

  const handleFilterByStatus = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(
        `/api/debt/search/bystatus?status=${status}`
      );
      setFilteredCustomerByStatus(response.data.customer);
      setFilteredSupplierByStatus(response.data.supplier);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra!", error);
    }
  };

  const handleFilterByDate = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(`/api/debt/search/bydate?date=${date}`);
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
    if (!status) {
      setIsSearched(false);
      setFilteredCustomerByStatus([]);
      setFilteredSupplierByStatus([]);
    }
  }, [date, status]);

  return {
    date,
    status,
    setDate,
    setStatus,
    filteredCustomerByDate,
    filteredSupplierByDate,
    filteredCustomerByStatus,
    filteredSupplierByStatus,
    handleFilterByStatus,
    handleFilterByDate,
  };
}
