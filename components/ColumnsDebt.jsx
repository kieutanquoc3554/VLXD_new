import moment from "moment";
import formatCurrency from "@/utils/formatCurrency";
import { Button, Flex } from "antd";

const ColumnsDebt = (handleViewDetails) => {
  return [
    { title: "Mã đơn hàng", dataIndex: "order_id", key: "order_id" },
    { title: "Mã khách hàng", dataIndex: "customer_id", key: "customer_id" },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Tổng tiền đơn hàng",
      dataIndex: "total_price",
      key: "total_price",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Số tiền đã thanh toán",
      dataIndex: "paid_amount",
      key: "paid_amount",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Số tiền cần thanh toán còn lại",
      dataIndex: "remaining_debt",
      key: "remaining_debt",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => moment(date).format("DD/MM/YYYY hh:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (debtRecord) => (
        <Flex>
          <Button type="primary" onClick={() => handleViewDetails(debtRecord)}>
            Xem chi tiết
          </Button>
        </Flex>
      ),
    },
  ];
};

export default ColumnsDebt;
