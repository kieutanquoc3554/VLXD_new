"use client";
import { Modal, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import useUser from "../../../hook/api/useUser";
import useProduct from "../../../hook/api/useProduct";
import useProductColumns from "../../../hook/ui/useProductColumns";
import { useProductHandler } from "../../../hook/handler/useProductHandler";
import useCategory from "@/app/hook/api/useCategory";
import ActionButtonProduct from "../../../../../components/ActionButtonProduct";
import tabTitles from "@/app/utils/tabTitles";

const { getTitleTabs } = tabTitles();
const { TabPane } = Tabs;

export default function ProductPage() {
  const { user } = useUser();
  const [tabKey, setTabKey] = useState("active");
  const { products, isLoading, refetch } = useProduct(tabKey);
  const { setCategories } = useCategory();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    results,
    keyword,
    filterKeyword,
    setFilterKeyword,
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    handleRestoreProduct,
    handleChange,
    confirmHideProduct,
    fetchCategories,
    setConfirmVisible,
    confirmVisible,
  } = useProductHandler({
    user,
    refetch,
    setOpenAddModal,
    setSelectedProduct,
    setCategories,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddModal = () => {
    setOpenAddModal(true);
  };

  const handleChangeTabKey = (key) => {
    setTabKey(key);
  };

  const columns = useProductColumns(
    tabKey,
    handleUpdate,
    handleHideProduct,
    handleDeleteProduct,
    handleRestoreProduct
  );

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2>Quản lý sản phẩm</h2>
      <ActionButtonProduct
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        selectedProduct={selectedProduct}
        setFilterKeyword={setFilterKeyword}
        handleChange={handleChange}
        handleAddModal={handleAddModal}
      />
      <Tabs activeKey={tabKey} onChange={handleChangeTabKey}>
        {["active", "hidden", "deleted"].map((key) => (
          <TabPane key={key} tab={getTitleTabs(key)}>
            <Table
              size="small"
              columns={columns}
              dataSource={
                keyword ? results : filterKeyword ? results : products
              }
              loading={isLoading}
              rowKey="id"
            />
          </TabPane>
        ))}
      </Tabs>
      <Modal
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={confirmHideProduct}
        okText="Xác nhận"
        cancelText="Huỷ"
        title="Xác nhận ẩn sản phẩm"
      >
        <p>
          Khi bạn thực hiện thao tác này, sản phẩm sẽ bị ẩn, không thể thực hiện
          các thao tác liên quan đến sản phẩm.
        </p>
      </Modal>
    </div>
  );
}
