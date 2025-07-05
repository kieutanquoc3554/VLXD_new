import { message } from "antd";
import { order } from "../../utils/order";
import useOrder from "../api/useOrder";
import axios from "axios";
import { useEffect, useState } from "react";

export const useOrderHandler = (fetchOrders) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [searchedOrder, setSearchedOrder] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const { fetchOrderById } = useOrder();
  const { statusPriority } = order();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!searchTerm || !orderDate) {
      setIsSearched(false);
      setSearchedOrder([]);
    }
  }, [searchTerm, orderDate]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const order = await fetchOrderById(orderId);
      const currentStatus = order.status;
      if (
        statusPriority[status] < statusPriority[currentStatus] &&
        status !== "Cancelled"
      ) {
        message.warning(
          `Không thể cập nhật trạng thái ${currentStatus} thành ${status}`
        );
        return;
      }
      await axios.put(
        `${apiUrl}/api/orders/${orderId}/status`,
        { status },
        {
          withCredentials: true,
        }
      );
      message.success(`Cập nhật trạng thái thành công: ${status}`);
      fetchOrders();
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái đơn hàng", error);
    }
  };

  const handleSearch = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/orders/search?searchTerm=${searchTerm}&order_date=${orderDate}`,
        {
          withCredentials: true,
        }
      );
      setSearchedOrder(response.data);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      console.log("Có lỗi tìm kiếm xảy ra: ", error);
      message.error("Từ khoá tìm kiếm bị trống!");
    }
  };

  const handleSearchByOrderDate = async () => {
    setIsSearched(true);
    try {
      if (!orderDate) {
        message.error("Ngày đặt hàng trống!");
        return;
      }
      const response = await axios.get(
        `${apiUrl}/api/orders/search?searchTerm=${searchTerm}&order_date=${orderDate}`,
        {
          withCredentials: true,
        }
      );
      setSearchedOrder(response.data);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      console.log("Có lỗi tìm kiếm xảy ra: ", error);
      message.error("Từ khoá tìm kiếm bị trống!");
    }
  };

  return {
    handleStatusChange,
    isSearched,
    setSearchTerm,
    handleSearch,
    searchedOrder,
    setOrderDate,
    handleSearchByOrderDate,
  };
};
