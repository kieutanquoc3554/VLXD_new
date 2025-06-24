"use client";
import "@ant-design/v5-patch-for-react-19";
import DashboardLayout from "./dashboard/layout";
import { Button } from "antd";

export default function Home() {
  const openModal = () => {
    Modal.confirm({
      title: "Test Modal",
      content: "Nội dung nè",
      onOk: () => message.success("OK!"),
    });
  };
  return (
    <>
      <DashboardLayout />
      <Button onClick={openModal}>Mở Modal</Button>;
    </>
  );
}
