import { Descriptions, Table } from "antd";
import formatCurrency from "@/app/utils/formatCurrency";

const DetailsOrderForm = ({ form }) => {
  const paidAmount = form.getFieldValue("paid_amount") || 0;
  const remaining_amount = form.getFieldValue("remaining_amount");
  const items = form.getFieldValue("items") || [];

  return (
    <>
      <Descriptions
        bordered
        column={2}
        size="middle"
        style={{ marginBottom: 24 }}
      >
        <Descriptions.Item label="Mã đơn hàng">
          {form.getFieldValue("id")}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khách hàng">
          {form.getFieldValue("customer_name")}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {form.getFieldValue("status")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {form.getFieldValue("order_date")}
        </Descriptions.Item>
      </Descriptions>

      <Table
        dataSource={items}
        rowKey={(record) => record.id || record.product_id} // đảm bảo key unique
        columns={[
          {
            title: "Tên sản phẩm",
            dataIndex: "product_name",
            key: "product_name",
          },
          { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
          {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price) => formatCurrency(price),
          },
          {
            title: "Danh mục",
            dataIndex: "category_name",
            key: "category_name",
          },
          {
            title: "Nhà cung cấp",
            dataIndex: "supplier_name",
            key: "supplier_name",
          },
        ]}
        summary={() => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <strong>Đã thanh toán</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={4}>
                <strong>{formatCurrency(paidAmount)}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <strong>Số tiền cần thanh toán còn lại</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={4}>
                <strong>{formatCurrency(remaining_amount)}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
        pagination={false}
      />
    </>
  );
};

export default DetailsOrderForm;
