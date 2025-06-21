import { Button, Flex, Modal, Table } from "antd";
import ColumnProductDebt from "./ColumnProductDebt";
import ColumnHistoryDebt from "./ColumnHistoryDebt";
import DebtDescriptions from "./DebtDescriptions";
import pdfMake from "pdfmake/build/pdfmake";
import moment from "moment";
import formatCurrency from "@/utils/formatCurrency";

const DebtModal = ({
  isModalViewDetails,
  setIsModalViewDetails,
  editingDebt,
  amount,
  setAmount,
  setEditingDebt,
  handleUpdateDebt,
  handleSubmit,
  setPaymentMethod,
  detailDebt,
}) => {
  const handlePrintPDF = () => {
    if (!detailDebt) return;

    const { customer_name, customer_phone, remaining_amount, items, history } =
      detailDebt;

    console.log(items);

    const itemTableBody = [
      ["STT", "Tên sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"],
      ...items.map((item, index) => [
        index + 1,
        item.product_name,
        item.quantity,
        formatCurrency(item.price),
        formatCurrency(item.total_price),
      ]),
    ];

    const historyTableBody = [
      ["Mã giao dịch", "Ngày", "Phương thức thanh toán", "Số tiền"],
      ...history.map((h) => [
        h.id,
        moment(h.payment_date).format("DD/MM/YYYY"),
        h.payment_method,
        formatCurrency(h.amount),
      ]),
    ];

    const docDefinition = {
      content: [
        { text: "Chi tiết công nợ khách hàng", style: "header" },
        { text: `Tên khách hàng: ${customer_name}`, style: "subheader" },
        { text: `SĐT: ${customer_phone}` },
        {
          text: `Công nợ còn lại: ${formatCurrency(remaining_amount)}`,
          margin: [0, 0, 0, 10],
        },

        { text: "Sản phẩm trong đơn hàng", style: "tableHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],
            body: itemTableBody,
          },
          layout: "lightHorizontalLines",
          margin: [0, 5, 0, 15],
        },

        { text: "Lịch sử thanh toán", style: "tableHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto"],
            body: historyTableBody,
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 12,
          bold: true,
        },
        tableHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download(`cong no ${customer_name}.pdf`);
  };

  return (
    <Modal
      open={isModalViewDetails}
      title="Chi tiết công nợ khách hàng"
      onCancel={() => {
        setIsModalViewDetails(false);
        setEditingDebt(false);
      }}
      footer={null}
      width={800}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {detailDebt ? (
        <>
          <Flex gap={10}>
            {detailDebt.remaining_amount > 0 && (
              <Button
                type="primary"
                style={{ marginBottom: "10px" }}
                onClick={() => handleUpdateDebt(detailDebt)}
              >
                Cập nhật công nợ
              </Button>
            )}
            <Button onClick={handlePrintPDF}>In công nợ</Button>
          </Flex>
          <DebtDescriptions
            detailDebt={detailDebt}
            editingDebt={editingDebt}
            amount={amount}
            setAmount={setAmount}
            handleSubmit={handleSubmit}
            setPaymentMethod={setPaymentMethod}
          />
          <h3>Sản phẩm trong đơn hàng</h3>
          <Table
            dataSource={detailDebt.items}
            pagination={false}
            rowKey={(record, index) => index}
            columns={ColumnProductDebt()}
          />
          <h3>Lịch sử giao dịch</h3>
          <Table
            dataSource={detailDebt.history}
            pagination={false}
            columns={ColumnHistoryDebt()}
          />
        </>
      ) : (
        <p>Đang tải chi tiết...</p>
      )}
    </Modal>
  );
};

export default DebtModal;
