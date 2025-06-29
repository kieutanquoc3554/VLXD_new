"use client";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useSuppliers() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [deletedSuppliers, setDeletedSuppliers] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/supplier/`);
      setSuppliers(data.filter((supplier) => !supplier.deleted));
      setDeletedSuppliers(data.filter((supplier) => supplier.deleted));
    } catch (error) {
      message.error("Lỗi khi tải danh sách nhà cung cấp", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { loading, suppliers, deletedSuppliers, fetchSuppliers };
}
