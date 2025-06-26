import { Modal, Descriptions, Table, Divider, Tag, Input, message } from "antd";
import ActionButtonSupplierDebt from "../components/ActionButtonSupplierDebt";
import useSupplierDebtHandler from "@/app/hook/handler/useSupplierDebtHandler";

const SupplierDebtModal = ({
  selectedSupplierDebt,
  isOpenDetailDebtModal,
  setIsOpenDetailDebtModal,
  detailSupplierDebt,
  isOpenPaySupplierDebt,
  handlePaySupplierDebt,
  setIsOpenPaySupplierDebt,
  fetchSupplierDebtDetail,
}) => {
  const { paymentAmount, setPaymentAmount, handleSubmit, exportToPDF } =
    useSupplierDebtHandler();
  if (!selectedSupplierDebt || !detailSupplierDebt) return null;

  const columnsItems = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá nhập",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (price) => `${Number(price).toLocaleString()} đ`,
    },
    {
      title: "Thành tiền",
      key: "total_price",
      render: (_, record) =>
        `${(record.quantity * Number(record.unit_price)).toLocaleString()} đ`,
    },
  ];

  const columnsPayments = [
    {
      title: "Ngày thanh toán",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${Number(amount).toLocaleString()} đ`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const getStatusTag = (status) => {
    switch (status) {
      case "paid":
        return <Tag color="green">Đã thanh toán</Tag>;
      case "partial":
        return <Tag color="orange">Thanh toán một phần</Tag>;
      default:
        return <Tag color="red">Chưa thanh toán</Tag>;
    }
  };

  return (
    <>
      <Modal
        title="Chi tiết công nợ"
        open={isOpenDetailDebtModal}
        onCancel={() => setIsOpenDetailDebtModal(false)}
        footer={null}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <ActionButtonSupplierDebt
          exportToPDF={exportToPDF}
          detailSupplierDebt={detailSupplierDebt}
          handlePaySupplierDebt={handlePaySupplierDebt}
        />
        <Descriptions
          bordered
          column={2}
          size="small"
          title="Thông tin nhà cung cấp"
        >
          <Descriptions.Item label="Tên">
            {detailSupplierDebt.supplier_name}
          </Descriptions.Item>
          <Descriptions.Item label="SĐT">
            {detailSupplierDebt.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nhập hàng">
            {new Date(detailSupplierDebt.created_at).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú">
            {detailSupplierDebt.note}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {Number(detailSupplierDebt.amount).toLocaleString()} đ
          </Descriptions.Item>
          <Descriptions.Item label="Đã trả">
            {Number(detailSupplierDebt.paid_amount).toLocaleString()} đ
          </Descriptions.Item>
          <Descriptions.Item label="Còn nợ">
            <b style={{ color: "red" }}>
              {Number(detailSupplierDebt.remaining_amount).toLocaleString()} đ
            </b>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {getStatusTag(detailSupplierDebt.status)}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Danh sách sản phẩm</Divider>
        <Table
          dataSource={detailSupplierDebt.items}
          columns={columnsItems}
          pagination={false}
          rowKey={(record) => record.id}
          size="small"
        />

        {Array.isArray(detailSupplierDebt.payments) &&
          detailSupplierDebt.payments.length > 0 && (
            <>
              <Divider orientation="left">Lịch sử thanh toán</Divider>
              <Table
                dataSource={detailSupplierDebt.payments}
                columns={columnsPayments}
                pagination={false}
                rowKey={(record) => record.id}
                size="small"
              />
            </>
          )}
      </Modal>
      <Modal
        title="Thanh toán đơn hàng"
        open={isOpenPaySupplierDebt}
        onCancel={() => setIsOpenPaySupplierDebt(false)}
        okText="Xác nhận thanh toán"
        cancelText="Huỷ"
        width={700}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
        onOk={async () => {
          handleSubmit(detailSupplierDebt);
          try {
            await fetchSupplierDebtDetail();
          } catch (err) {
            console.error("Lỗi khi fetch lại công nợ:", err);
            message.warning(
              "Đã thanh toán nhưng không thể cập nhật lại dữ liệu công nợ"
            );
          }
        }}
      >
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Tên">
            {detailSupplierDebt.supplier_name}
          </Descriptions.Item>
          <Descriptions.Item label="SĐT">
            {detailSupplierDebt.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nhập hàng">
            {new Date(detailSupplierDebt.created_at).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú">
            {detailSupplierDebt.note}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {Number(detailSupplierDebt.amount).toLocaleString()} đ
          </Descriptions.Item>
          <Descriptions.Item label="Đã trả">
            {Number(detailSupplierDebt.paid_amount).toLocaleString()} đ
          </Descriptions.Item>
          <Descriptions.Item label="Còn nợ">
            <b style={{ color: "red" }}>
              {Number(detailSupplierDebt.remaining_amount).toLocaleString()} đ
            </b>
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền thanh toán">
            <Input
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Nhập số tiền thanh toán"
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default SupplierDebtModal;
