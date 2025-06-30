"use client";

import { message } from "antd";
import axios from "axios";
import * as productServices from "../../services/productServices";
import { useState } from "react";

export const useProductHandler = ({
  user,
  setOpenAddModal,
  setSelectedProduct,
  refetch,
  setCategories,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [productToHide, setProductToHide] = useState(null);

  const handleUpdate = (product) => {
    setOpenAddModal(true);
    setSelectedProduct(product);
  };

  const handleHideProduct = (product) => {
    setProductToHide(product);
    setConfirmVisible(true);
  };

  const confirmHideProduct = async () => {
    try {
      const response = await axios.put(
        `/api/products/${productToHide}/hide`,
        {}
      );
      message.success(response.data.message);
      setTimeout(() => {
        setConfirmVisible(false);
        refetch();
      }, 300);
    } catch (error) {
      message.error("Ẩn sản phẩm thất bại!");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (user.role === "Admin") {
        const response = await axios.put(
          `${apiUrl}/api/products/delete/${id}`,
          {}
        );
        message.success(response.data.message);
        refetch();
      } else {
        message.error("Bạn chưa được cấp quyền để xoá sản phẩm!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productServices.fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    confirmHideProduct,
    fetchCategories,
    setConfirmVisible,
    confirmVisible,
  };
};
