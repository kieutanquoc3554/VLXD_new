import { Button, Flex } from "antd";
import FilterProduct from "./FilterProduct";
import SearchButtonProduct from "./SearchButtonProduct";
import AddProductFormModal from "./AddProductFormModal";

const ActionButtonProduct = ({
  openAddModal,
  setOpenAddModal,
  selectedProduct,
  setFilterKeyword,
  handleChange,
  handleAddModal,
}) => {
  return (
    <Flex align="center" justify="space-between" gap={10}>
      <Button type="primary" onClick={() => handleAddModal()}>
        Thêm sản phẩm
      </Button>
      <Flex align="center" gap={10}>
        <FilterProduct setFilterKeyword={setFilterKeyword} />
        <SearchButtonProduct onChange={handleChange} />
      </Flex>
      {openAddModal && (
        <AddProductFormModal
          open={openAddModal}
          title={selectedProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          onClose={() => {
            setOpenAddModal(false);
            setSelectedProduct(null);
            refetch();
          }}
          selectedProduct={selectedProduct}
        />
      )}
    </Flex>
  );
};

export default ActionButtonProduct;
