"use client";

import { Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [importSlips, setImportSlips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [form] = Form.useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchInventory = async (keyword) => {
    try {
      setIsLoading(true);
      const url = keyword
        ? `${apiUrl}/api/inventory/search/keyword?q=${keyword}`
        : `${apiUrl}/api/inventory`;
      const response = await axios.get(url);
      setInventory(response.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu kho hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventoryLogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/api/inventory/history/logs`);
      setInventoryLogs(response.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu lịch sử kho hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllImportSlips = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/inventory/import_slips/all`
      );
      setImportSlips(response.data.import_slips);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu phiếu nhập", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchInventoryLogs();
    fetchAllImportSlips();
  }, []);

  const handleEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
  };

  const handleSearch = (value) => {
    setSearchKey(value);
    fetchInventory(value);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem?.id) {
        await axios.put(`${apiUrl}/api/inventory/${editingItem.id}`, values, {
          withCredentials: true,
        });
        message.success("Cập nhật thành công!");
      } else {
        await axios.post(`${apiUrl}/api/inventory`, values, {
          withCredentials: true,
        });
        message.success("Thêm vào kho thành công!");
      }
      setEditingItem(undefined);
      form.resetFields();
      fetchInventory();
      fetchInventoryLogs();
    } catch (err) {
      console.log(err);
      message.error("Lỗi khi lưu kho hàng");
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/inventory`, values, {
        withCredentials: true,
      });
      message.success("Lưu phiếu nhập kho thành công");
      form.resetFields();
      fetchInventory();
      fetchInventoryLogs();
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi lưu phiếu nhập");
    }
  };

  return {
    form,
    inventory,
    importSlips,
    inventoryLogs,
    isLoading,
    editingItem,
    setEditingItem,
    fetchInventory,
    fetchInventoryLogs,
    handleEditModal,
    handleSearch,
    handleUpdate,
    handleSubmit,
  };
}
