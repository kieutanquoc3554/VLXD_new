"use client";

import { Button, Flex, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import useCategory from "../../../hook/api/useCategory";
import { useCategoryHandler } from "../../../hook/handler/useCategoryHandler";
import SearchFilterCategory from "../../../../components/SearchFilterCategory";
import TabsCategory from "../../../../components/TabsCategory";

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    setSearchTerm,
    loading,
    searchTerm,
    setFilter,
    categories,
    deletedCategories,
    filter,
    fetchCategories,
  } = useCategory();
  const { handleSearch, handleAddCategory, handleSubmit } = useCategoryHandler({
    form,
    setSelectedCategory,
    setIsModalOpen,
    selectedCategory,
    fetchCategories,
    setSearchTerm,
  });

  useEffect(() => {
    fetchCategories();
  }, [searchTerm, filter]);

  return (
    <div>
      <h2>Quản lý danh mục sản phẩm</h2>
      <Flex justify="space-between" align="center" gap={10}>
        <Button type="primary" onClick={handleAddCategory}>
          Thêm danh mục
        </Button>
        <SearchFilterCategory
          handleSearch={handleSearch}
          setFilter={setFilter}
        />
      </Flex>
      <TabsCategory
        loading={loading}
        categories={categories}
        deletedCategories={deletedCategories}
        form={form}
        setSelectedCategory={setSelectedCategory}
        setIsModalOpen={setIsModalOpen}
        selectedCategory={selectedCategory}
        fetchCategories={fetchCategories}
        setSearchTerm={setSearchTerm}
      />
      <Modal
        title={selectedCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedCategory ? "Lưu thay đổi" : "Thêm mới"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
