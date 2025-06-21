"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Checkbox, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authServices from "../src/app/lib/api/auth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authServices.login(values);
      message.success(response.message || "Đăng nhập thành công!");
      router.push("/dashboard/products");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/login-bg.jpg')]">
      <Card className="w-full h-full bg-white/90 shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">ĐĂNG NHẬP</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Checkbox>Nhớ tài khoản</Checkbox>
            <a className="float-right">Quên mật khẩu?</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          Chưa có tài khoản? <a href="#">Đăng ký</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
