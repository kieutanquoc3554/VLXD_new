"use client";

import { Button, Flex, Form, Input, Tabs, Table, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/customer`);
      setCustomers(data.filter((customer) => !customer.deleted));
      setDeletedCustomers(data.filter((customer) => customer.deleted));
    } catch (error) {
      console.log("Có lỗi xảy ra!" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleUpdateCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    form.setFieldsValue(customer);
  };

  const handleDeleteCustomer = async (id) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content:
        "Khi bạn thực hiện thao tác này, hệ thống sẽ tiến hành xoá thông tin người dùng, vui lòng khi truy cập 'Danh sách khách hàng đã xoá' để khôi phục",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ ",
      async onOk() {
        try {
          const response = await axios.delete(`${apiUrl}/api/customer/${id}`);
          if (response.status === 200) {
            message.success("Xoá thành công!");
            fetchCustomers();
          } else {
            message.error("Có lỗi xảy ra!");
          }
        } catch (error) {
          message.error(error);
        }
      },
    });
  };

  const handleRestoreCustomer = async (id) => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/customer/${id}`, {});
      message.info(data.message);
      fetchCustomers();
    } catch (error) {
      message.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedCustomer) {
        await axios.put(
          `${apiUrl}/api/customer/${selectedCustomer.id}`,
          values
        );
        message.success("Cập nhật thông tin người dùng thành công!");
      } else {
        const response = await axios.post(`${apiUrl}/api/customer`, values);
        if (response.status === 200) {
          message.success("Thêm khách hàng mới thành công!");
        }
      }
      fetchCustomers();
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.log(error);

        message.error(error.response.data.message || "Đã xảy ra lỗi!");
      } else {
        message.error("Lỗi kết nối đến server!");
      }
    }
  };

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
        <Input placeholder="Tìm kiếm khách hàng..." />
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Danh sách khách hàng" key="1">
          <Table columns={column} dataSource={customers} loading={isLoading} />
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
