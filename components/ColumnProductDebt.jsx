import { Image } from "antd";
import formatCurrency from "@/utils/formatCurrency";

const ColumnProductDebt = () => {
  return [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Phân loại",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "product_supplier",
      key: "product_supplier",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Thành tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Ảnh",
      dataIndex: "image_url",
      key: "image_url",
      render: (url) => <Image width={50} src={url} />,
    },
  ];
};

export default ColumnProductDebt;
