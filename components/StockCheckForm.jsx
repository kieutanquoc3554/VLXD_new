"use client";

import { Table, InputNumber, Button, message } from "antd";
import { useState } from "react";
import axios from "axios";

const StockCheckForm = ({ data, loading }) => {
  const [quantities, setQuantities] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (value, product_id) => {
    setQuantities({ ...quantities, [product_id]: value });
  };

  const handleSubmit = async () => {
    const reportData = Object.entries(quantities).map(
      ([product_id, actual_quantity]) => ({
        product_id: Number(product_id),
        actual_quantity: Number(actual_quantity),
      })
    );

    if (reportData.length === 0) {
      message.warning("Vui lòng nhập ít nhất một số lượng thực tế");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${apiUrl}/api/inventory/stock-check`, reportData, {
        withCredentials: true,
      });
      message.success("Lập báo cáo kiểm kho thành công");
      setQuantities({});
    } catch (err) {
      message.error("Lỗi khi lập báo cáo");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
    },
    {
      title: "Tồn kho hệ thống",
      dataIndex: "quantity",
    },
    {
      title: "Số lượng thực tế",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={quantities[record.product_id]}
          onChange={(value) => handleChange(value, record.product_id)}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="product_id"
        pagination={false}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
        loading={submitting}
      >
        Lập báo cáo
      </Button>
    </>
  );
};

export default StockCheckForm;
