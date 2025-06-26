import moment from "moment";
import formatCurrency from "@/app/utils/formatCurrency";

const ColumnHistoryDebt = () => {
  return [
    { title: "Mã giao dịch", dataIndex: "id" },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "amount",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Thời điểm thanh toán",
      dataIndex: "payment_date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
  ];
};

export default ColumnHistoryDebt;
