import { Button, Form, Input } from "antd";

const EmployeeForm = ({ form, handleSubmit, selectedEmployee }) => {
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Tên nhân viên"
        rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="role" label="Chức vụ">
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Địa chỉ email"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ email" }]}
      >
        <Input />
      </Form.Item>
      {!selectedEmployee && (
        <Form.Item
          name="password"
          label="Mật khẩu đăng nhập"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Button type="primary" htmlType="submit">
        {selectedEmployee ? "Cập nhật thông tin" : "Thêm nhân viên"}
      </Button>
    </Form>
  );
};
export default EmployeeForm;
