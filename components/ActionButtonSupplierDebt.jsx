import { Button, Flex } from "antd";

const ActionButtonSupplierDebt = ({
  handlePaySupplierDebt,
  detailSupplierDebt,
  exportToPDF,
}) => {
  return (
    <Flex align="center" justify="right" gap={5}>
      <Button type="default" onClick={() => handlePaySupplierDebt()}>
        Thanh toán
      </Button>
      <Button type="default" onClick={() => exportToPDF(detailSupplierDebt)}>
        In công nợ
      </Button>
    </Flex>
  );
};

export default ActionButtonSupplierDebt;
