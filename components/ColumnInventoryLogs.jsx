import { Space, Tag, Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const ColumnInventoryLogs = () => {
  const renderQuantity = (quantity) => {
    let color = "default";
    let icon = <MinusOutlined />;
    let prefix = "";
    if (quantity > 0) {
      color = "green";
      icon = <ArrowUpOutlined />;
      prefix = "+";
    } else if (quantity < 0) {
      color = "red";
      icon = <ArrowDownOutlined />;
      prefix = "";
    }

    return (
      <Space>
        {icon}
        <Typography.Text strong style={{ color }}>
          {prefix}
          {quantity}
        </Typography.Text>
      </Space>
    );
  };

  return [
    {
      title: "Mã giao dịch",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <Tag
          color={
            record.type === "import"
              ? "green"
              : record.type === "adjustment"
              ? "gold"
              : "volcano"
          }
        >
          {record.type === "import"
            ? "Nhập kho"
            : record.type === "adjustment"
            ? "Cập nhật"
            : "Xuất kho"}
        </Tag>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: renderQuantity,
    },
    { title: "Ghi chú giao dịch", dataIndex: "note", key: "note" },
    {
      title: "Người phụ trách",
      dataIndex: "employee_name",
      key: "employee_name",
    },
  ];
};

export default ColumnInventoryLogs;
