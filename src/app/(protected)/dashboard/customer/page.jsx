"use client";

import useCustomer from "@/app/hook/api/useCustomer";
import useCustomerHandler from "@/app/hook/handler/useCustomerHandler";
import { Button, Flex, Form, Input, Tabs, Table, Modal } from "antd";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { customers, deletedCustomers, isLoading, fetchCustomers } =
    useCustomer();
  const {
    form,
    selectedCustomer,
    isModalOpen,
    setIsModalOpen,
    isSearchedCustomer,
    onChangeInput,
    handleSearch,
    handleAddCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
    handleRestoreCustomer,
    handleSubmit,
  } = useCustomerHandler({ fetchCustomers, setSearchTerm });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const column = [
    { title: "ID khách hàng", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "addres" },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <span>{record.email ? record.email : "Không có email"}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10} align="center">
          <Button type="primary" onClick={() => handleUpdateCustomer(record)}>
            Cập nhật
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteCustomer(record.id)}
          >
            Xoá
          </Button>
        </Flex>
      ),
    },
  ];

  const deletedColumns = [
    { title: "ID khách hàng", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <span>{record.email ? record.email : "Không có email"}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10} align="center">
          <Button
            type="primary"
            onClick={() => handleRestoreCustomer(record.id)}
          >
            Khôi phục
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <div>
      <h2>Quản lý khách hàng</h2>
      <Flex
        gap={10}
        align="center"
        justify="space-between"
        style={{ marginBottom: "10px" }}
      >
        <Button type="primary" onClick={handleAddCustomer}>
          Thêm khách hàng mới
        </Button>
        <Input placeholder="Tìm kiếm khách hàng..." onChange={onChangeInput} />
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Danh sách khách hàng" key="1">
          <Table
            columns={column}
            dataSource={searchTerm ? isSearchedCustomer : customers}
            loading={isLoading}
          />
        </TabPane>
        <TabPane tab="Danh sách khách hàng đã xoá" key="2">
          <Table
            columns={deletedColumns}
            dataSource={deletedCustomers}
            loading={isLoading}
          />
        </TabPane>
      </Tabs>
      <Modal
        title={
          selectedCustomer
            ? "Chỉnh sửa thông tin khách hàng"
            : "Thêm khách hàng"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại khách hàng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Địa chỉ email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedCustomer ? "Cập nhật thông tin" : "Thêm khách hàng"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
