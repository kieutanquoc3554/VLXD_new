import { Button, Flex, Tag } from "antd";

const ColumnInventory = (handleEditModal) => {
  return [
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <Flex gap={10} align="center">
          <span>{record.product_name}</span>
          {record.quantity < 10 && <Tag color="red">Sắp hết</Tag>}
        </Flex>
      ),
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Vị trí kho",
      dataIndex: "warehouse_location",
      key: "warehouse_location",
    },
    // {
    //   title: "Hành động",
    //   render: (_, record) => (
    //     <Button type="primary" onClick={() => handleEditModal(record)}>
    //       Cập nhật
    //     </Button>
    //   ),
    // },
  ];
};

export default ColumnInventory;
