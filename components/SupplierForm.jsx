import { Button, Form, Input } from "antd";

const SupplierForm = ({ form, handleSubmit, selectedSupplier }) => {
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Tên nhà cung cấp"
        rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại nhà cung cấp",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Địa chỉ email">
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ liên hệ">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {selectedSupplier ? "Lưu thay đổi" : "Thêm"}
      </Button>
    </Form>
  );
};

export default SupplierForm;
