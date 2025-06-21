import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  DropboxOutlined,
  ProductOutlined,
  LinkOutlined,
  UserOutlined,
  InboxOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import Link from "next/link";
import { ThemeContext } from "../src/app/context/ThemeContext";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useContext(ThemeContext);

  const menuItems = [
    {
      key: "category",
      icon: <AppstoreOutlined />,
      label: "Danh mục",
      children: [
        {
          key: "1",
          icon: <ProductOutlined />,
          label: <Link href="/dashboard/products">Sản phẩm</Link>,
        },
        {
          key: "2",
          icon: <DropboxOutlined />,
          label: <Link href="/dashboard/categories">Danh mục sản phẩm</Link>,
        },
        {
          key: "3",
          icon: <LinkOutlined />,
          label: <Link href="/dashboard/suppliers">Nhà cung cấp</Link>,
        },
        {
          key: "4",
          icon: <UserOutlined />,
          label: <Link href="/dashboard/customer">Khách hàng</Link>,
        },
        {
          key: "5",
          icon: <InboxOutlined />,
          label: <Link href="/dashboard/inventory">Kho hàng</Link>,
        },
        {
          key: "6",
          icon: <UserOutlined />,
          label: <Link href="/dashboard/employee">Nhân viên</Link>,
        },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Giao dịch",
      children: [
        {
          key: "7",
          icon: <FormOutlined />,
          label: <Link href="/dashboard/order">Đơn hàng</Link>,
        },
        {
          key: "8",
          icon: <FaMoneyBillWave />,
          label: <Link href="/dashboard/bill">Danh sách hoá đơn</Link>,
        },
        {
          key: "9",
          icon: <GiPayMoney />,
          label: <Link href="/dashboard/debt">Công nợ</Link>,
        },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Báo cáo & Thống kê",
      children: [
        {
          key: "10",
          label: "Doanh thu", // chưa gắn route
        },
        {
          key: "11",
          label: "Hàng tồn kho", // chưa gắn route
        },
      ],
    },
    {
      key: "12",
      icon: <SettingOutlined />,
      label: "Cấu hình hệ thống", // chưa gắn route
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      width={260}
      style={{
        height: "100vh",
        background: theme === "dark" ? "#121212" : "white",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Menu
        theme={theme === "dark" ? "dark" : "light"}
        mode="inline"
        defaultOpenKeys={["category", "orders", "reports"]}
        style={{
          borderRight: "none",
          background: theme === "dark" ? "#121212" : "white",
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
