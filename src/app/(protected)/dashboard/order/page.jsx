"use client";

import useOrder from "@/app/hook/api/useOrder";
import { useOrderHandler } from "@/app/hook/handler/useOrderHandler";
import { Button, Flex, Form } from "antd";
import { useEffect, useState } from "react";
import HeadingButtonOrder from "../../../../../components/HeadingButtonOrder";
import OrderTabs from "../../../../../components/OrderTabs";
import ColumnOrders from "../../../../../components/ColumnOrders";
import CreateOrderModal from "../../../../../components/CreateOrderModal";
import DetailsOrderModal from "../../../../../components/DetailsOrderModal";

export default function OrderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { orders, isLoading, fetchOrders, fetchOrderById, detailsOrder } =
    useOrder();
  const {
    handleStatusChange,
    isSearched,
    setSearchTerm,
    handleSearch,
    searchedOrder,
    setOrderDate,
    handleSearchByOrderDate,
  } = useOrderHandler(fetchOrders);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <>
      <h2>Quản lý đơn hàng</h2>
      <Flex gap={10} align="center">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm đơn hàng
        </Button>
        <HeadingButtonOrder
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          setOrderDate={setOrderDate}
          onFilter={handleSearchByOrderDate}
        />
      </Flex>
      <OrderTabs
        orders={orders}
        isLoading={isLoading}
        ColumnOrders={ColumnOrders}
        form={form}
        handleStatusChange={handleStatusChange}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        fetchOrderById={fetchOrderById}
        fetchOrder={fetchOrders}
        detailsOrder={detailsOrder}
        isSearched={isSearched}
        searchedOrder={searchedOrder}
      />
      <CreateOrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DetailsOrderModal
        form={form}
        isDetailsModalOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
      />
    </>
  );
}
