import { Table, Tabs } from "antd";
import ColumnActiveCategory from "../components/ColumnActiveCategory";
import ColumnDeletedCategory from "../components/ColumnDeletedCategory";
import { useCategoryHandler } from "../src/app/hook/handler/useCategoryHandler";

const { TabPane } = Tabs;

const TabsCategory = ({
  loading,
  categories,
  deletedCategories,
  form,
  setSelectedCategory,
  setIsModalOpen,
  selectedCategory,
  fetchCategories,
  setSearchTerm,
}) => {
  const {
    handleEdit,
    handleDisable,
    handleSoftDelete,
    handleRestoreCategories,
    handleDeleteCategory,
  } = useCategoryHandler({
    form,
    setSelectedCategory,
    setIsModalOpen,
    selectedCategory,
    fetchCategories,
    setSearchTerm,
  });
  return (
    <Tabs defaultActiveKey="1">
      <TabPane className="" tab="Danh mục sản phẩm" key="1">
        <Table
          columns={ColumnActiveCategory(
            handleDisable,
            handleEdit,
            handleSoftDelete
          )}
          dataSource={categories}
          loading={loading}
          rowKey="id"
        />
      </TabPane>
      <TabPane tab="Danh mục đã xoá" key="2">
        <Table
          columns={ColumnDeletedCategory(
            handleRestoreCategories,
            handleDeleteCategory
          )}
          dataSource={deletedCategories}
          loading={loading}
          rowKey="id"
        />
      </TabPane>
    </Tabs>
  );
};

export default TabsCategory;
