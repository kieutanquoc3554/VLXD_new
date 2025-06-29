import { Button, Flex, Input } from "antd";

const SupplierToolbar = ({
  setSearchTerm,
  handleSearchSupplier,
  handleAddSupplier,
}) => {
  return (
    <Flex justify="space-between" align="center" gap={10}>
      <Button type="primary" onClick={handleAddSupplier}>
        Thêm nhà cung cấp
      </Button>
      <Flex gap={10}>
        <Input
          placeholder="Tìm kiếm nhà cung cấp..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="primary" onClick={handleSearchSupplier}>
          Tìm kiếm
        </Button>
      </Flex>
    </Flex>
  );
};

export default SupplierToolbar;
