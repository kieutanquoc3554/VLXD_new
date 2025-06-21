import { Button, Flex } from "antd";

const SupplierColumn = ({
  handleEditSupplier,
  handleDeleteSupplier,
  handleRestore,
}) => {
  const columns = [
    { title: "ID nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10}>
          <Button type="primary" onClick={() => handleEditSupplier(record)}>
            Cập nhật
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteSupplier(record.id)}
          >
            Xoá
          </Button>
        </Flex>
      ),
    },
  ];

  const columnsDeleted = [
    { title: "ID nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={10}>
          <Button type="primary" onClick={() => handleRestore(record.id)}>
            Khôi phục
          </Button>
        </Flex>
      ),
    },
  ];

  return { columns, columnsDeleted };
};

export default SupplierColumn;
