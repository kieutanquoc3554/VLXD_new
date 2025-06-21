"use client";
import {
  Form,
  Modal,
  Radio,
  InputNumber,
  DatePicker,
  Button,
  message,
} from "antd";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function SuspendEmployeeModal({ open, onClose, employee }) {
  const [form] = Form.useForm();
  const [suspendType, setSuspendType] = useState("permanent");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      let payload = {
        suspended_permanently: suspendType === "permanent",
        suspended_until: null,
      };
      if (suspendType === "months") {
        payload.suspended_until = dayjs()
          .add(values.months, "month")
          .format("YYYY-MM-DD");
      } else if (suspendType === "date") {
        payload.suspended_until = values.date.format("YYYY-MM-DD");
      }
      await axios.put(`${apiUrl}/api/auth/suspend/${employee.id}`, payload);
      message.success("Đã đình chỉ nhân viên");
      onClose(true);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi đình chỉ nhân viên!");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => onClose(false)}
      title={`Đình chỉ nhân viên: ${employee?.name || ""}`}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Hình thức đình chỉ"
          name="type"
          initialValue="permanent"
        >
          <Radio.Group onChange={(e) => setSuspendType(e.target.value)}>
            <Radio value="permanent">Đình chỉ vĩnh viễn</Radio>
            <Radio value="months">Đình chỉ theo số tháng</Radio>
            <Radio value="date">Đình chỉ đến ngày cụ thể</Radio>
          </Radio.Group>
        </Form.Item>

        {suspendType === "months" && (
          <Form.Item
            name="months"
            label="Số tháng"
            rules={[{ required: true, message: "Nhập số tháng đình chỉ" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        )}

        {suspendType === "date" && (
          <Form.Item
            name="date"
            label="Ngày hết đình chỉ"
            rules={[{ required: true, message: "Chọn ngày kết thúc" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        )}

        <Button type="primary" onClick={handleSubmit}>
          Xác nhận đình chỉ
        </Button>
      </Form>
    </Modal>
  );
}
