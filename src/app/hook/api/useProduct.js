"use client";

import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";

export default function useProduct(tabKey) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/products`);
      const filtered = data.filter((p) => {
        if (tabKey === "active") return !p.isDeleted && !p.disabled;
        if (tabKey === "hidden") return p.disabled;
        if (tabKey === "deleted") return p.isDeleted;
      });
      setProducts(filtered);
    } catch (error) {
      message.error("Không thể tải sản phẩm!", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [tabKey]);

  return { products, isLoading, refetch: fetchProducts };
}
