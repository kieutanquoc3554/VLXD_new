import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "Hệ thống Quản lý Vật liệu Xây dựng & Trang trí nội thất Kim Dung",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider locale={viVN}>
          <ThemeProvider>{children}</ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
