import { Button, Flex } from "antd";
import { debt } from "@/app/utils/debt";
import formatCurrency from "@/app/utils/formatCurrency";

const ColumnSupplierDebt = (handleViewSupplierDebtDetails) => {
  const { getStatusDebt } = debt();

  return [
    { title: "Mã công nợ", dataIndex: "id", key: "id" },
    { title: "Mã nhà cung cấp", dataIndex: "supplier_id", key: "supplier_id" },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "supplier_name",
      key: "supplier_name",
    },
    {
      title: "Tổng tiền cần thanh toán",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Số tiền đã thanh toán",
      dataIndex: "paid_amount",
      key: "paid_amount",
      render: (pa) => formatCurrency(pa),
    },
    {
      title: "Số tiền còn lại",
      dataIndex: "remaining_amount",
      key: "remaining_amount",
      render: (ra) => formatCurrency(ra),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusDebt(status),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Flex align="center" gap={10}>
          <Button
            type="primary"
            onClick={() => handleViewSupplierDebtDetails(record)}
          >
            Xem chi tiết
          </Button>
        </Flex>
      ),
    },
  ];
};

export default ColumnSupplierDebt;
