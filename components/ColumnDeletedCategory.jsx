import { Button, Flex } from "antd";

const ColumnDeletedCategory = (
  handleRestoreCategories,
  handleDeleteCategory
) => {
  return [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Thao tác",
      key: "deleted",
      render: (_, record) => (
        <Flex gap={10}>
          <Button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => handleRestoreCategories(record.id, record.disabled)}
          >
            Khôi phục
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteCategory(record.id)}
          >
            Xoá vĩnh viễn
          </Button>
        </Flex>
      ),
    },
  ];
};

export default ColumnDeletedCategory;
