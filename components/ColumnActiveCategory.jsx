import { Button, Flex, Switch } from "antd";

const ColumnActiveCategory = (handleDisable, handleEdit, handleSoftDelete) => {
  return [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "product_count",
      key: "product_count",
    },
    {
      title: "Tạm ẩn",
      dataIndex: "disabled",
      key: "disabled",
      render: (disabled, record) => (
        <Switch
          checked={disabled}
          onChange={(checked) => handleDisable(record.id, checked)}
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex gap={10}>
          <Button type="dashed" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleSoftDelete(record.id, record.disabled)}
          >
            Xóa
          </Button>
        </Flex>
      ),
    },
  ];
};

export default ColumnActiveCategory;
