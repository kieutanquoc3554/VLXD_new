import { Descriptions, Flex, Input, Select } from "antd";
import moment from "moment";
import formatCurrency from "@/app/utils/formatCurrency";
import { FiEdit } from "react-icons/fi";

const DebtDescriptions = ({
  detailDebt,
  editingDebt,
  amount,
  setAmount,
  handleSubmit,
  setPaymentMethod,
}) => {
  return (
    <Descriptions bordered size="small" column={2} style={{ marginBottom: 20 }}>
      <Descriptions.Item label="Mã đơn hàng">{detailDebt.id}</Descriptions.Item>
      <Descriptions.Item label="Mã khách hàng">
        {detailDebt.customer_id}
      </Descriptions.Item>
      <Descriptions.Item label="Tên khách hàng" span={2}>
        {detailDebt.customer_name}
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">
        {detailDebt.customer_phone}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày đặt hàng">
        {moment(detailDebt.order_date).format("DD/MM/YYYY HH:mm")}
      </Descriptions.Item>
      <Descriptions.Item label="Tổng tiền">
        {formatCurrency(detailDebt.total_price)}
      </Descriptions.Item>
      <Descriptions.Item label="Đã thanh toán">
        <Flex align="center" gap={20}>
          {editingDebt ? (
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
          ) : (
            <>{formatCurrency(detailDebt.paid_amount)}</>
          )}
          {editingDebt && (
            <FiEdit
              style={{ cursor: "pointer" }}
              onClick={() => handleSubmit()}
            />
          )}
        </Flex>
      </Descriptions.Item>
      <Descriptions.Item label="Còn lại">
        {formatCurrency(detailDebt.remaining_amount)}
        {detailDebt.remaining_amount > 0 ? (
          <div style={{ color: "#faad14", fontSize: "12px" }}>
            Còn phải thu {formatCurrency(detailDebt.remaining_amount)}
          </div>
        ) : (
          <div style={{ color: "green", fontSize: "12px" }}>
            Đã thanh toán đủ
          </div>
        )}
      </Descriptions.Item>
      {editingDebt && (
        <Descriptions.Item label="Hình thức thanh toán">
          <Select
            defaultValue={detailDebt.payment_method}
            placeholder="Chọn phương thức thanh toán"
            onChange={(value) => setPaymentMethod(value)}
            options={[
              { value: "cash", label: "Tiền mặt" },
              { value: "banking", label: "Chuyển khoản" },
            ]}
            style={{ width: 150 }}
          />
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Hình thức thanh toán">
        {detailDebt.payment_method}
      </Descriptions.Item>
      <Descriptions.Item label="Trạng thái đơn hàng">
        {detailDebt.status}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DebtDescriptions;
