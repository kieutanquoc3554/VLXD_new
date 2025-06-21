import { Menu, Layout, Typography, Button, Switch, message } from "antd";
import { ThemeContext } from "../src/app/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { Title } = Typography;

const NavigationBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/auth/login`, {
          withCredentials: true,
        });
        setUsername(res.data.name);
      } catch (error) {
        console.error("Lỗi khi lấy tên người dùng:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`/api/auth/signout`, {}, { withCredentials: true });
      message.success("Đăng xuất thành công!");
      router.push("/login");
    } catch (error) {
      message.error("Lỗi khi đăng xuất, vui lòng thử lại!" + error);
    }
  };
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: theme === "dark" ? "#121212" : "#ffffff",
        padding: "0 20px",
        boxShadow:
          theme === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title
        level={3}
        style={{ color: theme === "dark" ? "#fff" : "black", margin: 0 }}
      >
        Hệ thống Quản lý Vật liệu Xây dựng & Trang trí nội thất Kim Dung
      </Title>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
        <Button type="primary">{username}</Button>
        <Button type="default" danger onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </Header>
  );
};

export default NavigationBar;
