import { Button, Flex, Input } from "antd";

const SupplierToolbar = ({ handleAddSupplier }) => {
  return (
    <Flex justify="space-between" align="center" gap={10}>
      <Button type="primary" onClick={handleAddSupplier}>
        Thêm nhà cung cấp
      </Button>
      <Flex gap={10}>
        <Input placeholder="Tìm kiếm nhà cung cấp..." />
      </Flex>
    </Flex>
  );
};

export default SupplierToolbar;
