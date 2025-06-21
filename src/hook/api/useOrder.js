import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [detailsOrder, setDetailsOrder] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/orders`, {
        withCredentials: true,
      });
      setOrders(data);
    } catch (error) {
      message.error("Lỗi lấy danh sách đơn hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/orders/${id}`, {
        withCredentials: true,
      });
      setDetailsOrder(data);
      return data;
    } catch (error) {
      message.error("Có lỗi khi lấy chi tiết đơn hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, isLoading, detailsOrder, fetchOrders, fetchOrderById };
}
