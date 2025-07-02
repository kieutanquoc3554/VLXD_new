"use client";

import { message } from "antd";
import axios from "axios";
import * as productServices from "../../services/productServices";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

export const useProductHandler = ({
  user,
  setOpenAddModal,
  setSelectedProduct,
  refetch,
  setCategories,
}) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [productToHide, setProductToHide] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

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
        const response = await axios.put(`/api/products/${id}/delete`, {});
        message.success(response.data.message);
        refetch();
      } else {
        message.error("Bạn chưa được cấp quyền để xoá sản phẩm!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreProduct = async (id) => {
    try {
      const response = await axios.post(
        `/api/products/${id}/delete/restore`,
        {}
      );
      if (response.status === 200) {
        message.success("Đã khôi phục thành công");
        refetch();
      } else {
        message.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      throw new Error(error);
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

  const fetchSearchResults = async (query) => {
    if (!query.trim()) return setResults([]);
    try {
      const res = await axios.get(
        `/api/products/search?query=${encodeURIComponent(query)}`
      );
      setResults(res.data);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchSearchResults(query);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };

  return {
    results,
    keyword,
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    handleRestoreProduct,
    handleChange,
    confirmHideProduct,
    fetchCategories,
    setConfirmVisible,
    confirmVisible,
  };
};
