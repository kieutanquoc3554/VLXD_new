import { Button, Form, InputNumber, message, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useProduct from "@/hook/api/useProduct";
import formatCurrency from "@/utils/formatCurrency";

const CreateOrderForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { products } = useProduct("active");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchCustomer = async () => {
    const { data } = await axios.get(`${apiUrl}/api/customer`);
    setCustomer(data);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleAddItem = (productId) => {
    const existing = selectedItems.find(
      (item) => item.product_id === productId
    );
    if (existing) return;
    const product = products.find((p) => p.id === productId);
    setSelectedItems([
      ...selectedItems,
      {
        product_id: productId,
        name: product.name,
        quantity: 1,
        price: product.price,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const customer_id = form.getFieldValue("customer_id");
      const paid_amount = form.getFieldValue("paid_amount");
      const payload = {
        customer_id,
        items: selectedItems.map(({ product_id, quantity, price }) => ({
          product_id,
          quantity,
          price,
        })),
        payment_method: paymentMethod,
        paid_amount: paid_amount || total,
      };
      await axios.post(`${apiUrl}/api/orders`, payload, {
        withCredentials: true,
      });
      message.success("Tạo đơn hàng thành công!");
      onSuccess();
    } catch (error) {
      console.log(error);

      message.error("Tạo đơn hàng thất bại", error);
    }
  };

  const updateQuantity = (index, quantity) => {
    const item = [...selectedItems];
    item[index].quantity = quantity;
    setSelectedItems(item);
  };

  const total = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="customer_id"
        label="Khách hàng"
        rules={[{ required: true }]}
      >
        <Select placeholder="Vui lòng chọn khách hàng">
          {customer.map((c) => (
            <Select.Option key={c.id} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Thêm sản phẩm">
        <Select
          placeholder="Chọn sản phẩm để thêm"
          showSearch
          onSelect={handleAddItem}
        >
          {products.map((p) => (
            <Select.Option key={p.id} value={p.id}>
              {p.name} ({formatCurrency(p.price)})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Table
        dataSource={selectedItems}
        rowKey="product_id"
        pagination={false}
        columns={[
          { title: "Tên", dataIndex: "name" },
          {
            title: "Số lượng",
            dataIndex: "quantity",
            render: (qty, _, index) => (
              <InputNumber
                min={1}
                value={qty}
                onChange={(value) => updateQuantity(index, value)}
              />
            ),
          },
          {
            title: "Giá",
            dataIndex: "price",
            render: (price) => formatCurrency(price),
          },
          {
            title: "Thành tiền",
            render: (_, record) =>
              formatCurrency(record.quantity * record.price),
          },
        ]}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3}>
              <strong>Tổng cộng</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              <strong>{formatCurrency(total)}</strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
      <Form.Item label="Phương thức thanh toán (tuỳ chọn)">
        <Select onChange={(value) => setPaymentMethod(value)} allowClear>
          <Select.Option value="Cash">Tiền mặt</Select.Option>
          <Select.Option value="Banking">Chuyển khoản</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="paid_amount" label="Số tiền đã thanh toán">
        <InputNumber />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!selectedItems.length}
      >
        Tạo đơn hàng
      </Button>
    </Form>
  );
};

export default CreateOrderForm;
