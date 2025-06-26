import { Tag } from "antd";
import formatCurrency from "@/app/utils/formatCurrency";
import moment from "moment";

const ColumnImportSlips = () => {
  return [
    {
      title: "Mã phiếu",
      dataIndex: "id",
      key: "id",
      render: (id) => <strong>#PN{id.toString().padStart(5, "0")}</strong>,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier_name",
      key: "supplier_name",
      render: (name) =>
        name ? (
          <Tag color="blue">{name}</Tag>
        ) : (
          <Tag color="default">Không có</Tag>
        ),
    },
    {
      title: "Nhân viên nhập kho",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Tổng tiền đơn nhập",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Ngày nhập",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => moment(date).format("DD/MM/YYYY hh:mm"),
    },
    { title: "Ghi chú", dataIndex: "note", key: "note" },
  ];
};

export default ColumnImportSlips;
