import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const InventoryModal = ({
  editingItem,
  setEditingItem,
  onUpdate,
  form,
  products,
  handleSubmit,
  suppliers,
}) => {
  return (
    <Modal
      title={editingItem ? "Cập nhật kho hàng" : "Thêm vào kho"}
      open={!!editingItem || editingItem === null}
      onCancel={() => setEditingItem(undefined)}
      onOk={onUpdate}
      okText="Lưu"
      cancelText="Hủy"
      width={700}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="suppliers_id" label="Nhà cung cấp">
          <Select
            placeholder="Chọn nhà cung cấp"
            options={suppliers.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
          />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <div
                  key={key}
                  style={{ display: "flex", gap: 8, alignItems: "baseline" }}
                >
                  <Form.Item
                    {...rest}
                    name={[name, "product_id"]}
                    rules={[{ required: true, message: "Chọn sản phẩm" }]}
                  >
                    <Select
                      placeholder="Chọn sản phẩm"
                      options={products.map((p) => ({
                        label: p.name,
                        value: p.id,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    {...rest}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Nhập số lượng" }]}
                  >
                    <InputNumber min={1} placeholder="Số lượng" />
                  </Form.Item>
                  <Form.Item
                    {...rest}
                    name={[name, "unit_price"]}
                    rules={[{ required: true, message: "Nhập giá nhập" }]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="Giá nhập"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                  <Form.Item {...rest} name={[name, "warehouse_location"]}>
                    <Input placeholder="Vị trí kho" />
                  </Form.Item>

                  <Button onClick={() => remove(name)} type="default">
                    Xoá
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="default" onClick={() => add({})}>
                  + Thêm sản phẩm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          name="paid_amount"
          label="Số tiền đã thanh toán"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Số tiền phải lớn hơn hoặc bằng 0",
            },
          ]}
        >
          <InputNumber
            placeholder="Số tiền đã thanh toán"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryModal;
