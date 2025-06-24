"use client";
import "@ant-design/v5-patch-for-react-19";
import { Layout } from "antd";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/NavigationBar";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <NavigationBar />
        <Content
          style={{
            padding: "24px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
