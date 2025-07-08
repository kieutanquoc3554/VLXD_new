"use client";
import { useEffect, useState } from "react";
import { Space, Typography, DatePicker, Row, Col, Card } from "antd";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import formatCurrency from "@/app/utils/formatCurrency";
import {
  RiseOutlined,
  MoneyCollectOutlined,
  InboxOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import useStatistic from "@/app/hook/api/useStatistic";
const { RangePicker } = DatePicker;
const { Title } = Typography;

const DashboardOverview = () => {
  const [dateRange, setDateRange] = useState([]);
  const { statisticOverview, fetchStatisticOverview } = useStatistic();
  const COLORS = ["#0088FE", "#FF8042"];

  useEffect(() => {
    fetchStatisticOverview();
  }, []);

  const debtData = [
    { name: "Khách hàng", value: 13500000 },
    { name: "Nhà cung cấp", value: 7200000 },
  ];

  const revenueByMonth = [
    { month: "Th1", revenue: 10000000 },
    { month: "Th2", revenue: 15000000 },
    { month: "Th3", revenue: 12000000 },
    { month: "Th4", revenue: 17000000 },
    { month: "Th5", revenue: 20000000 },
    { month: "Th6", revenue: 18000000 },
  ];

  const statCards = [
    {
      title: "Tổng doanh thu",
      value: `${formatCurrency(statisticOverview.total_revenue || 0)}`,
      icon: <MoneyCollectOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      bg: "#f6ffed",
      border: "#b7eb8f",
    },
    {
      title: "Tổng lợi nhuận",
      value: `${formatCurrency(statisticOverview.actual_revenue || 0)}`,
      icon: <RiseOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      bg: "#e6f7ff",
      border: "#91d5ff",
    },
    {
      title: "Giá trị tồn kho",
      value: `${formatCurrency(statisticOverview.total_inventory || 0)}`,
      icon: <InboxOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      bg: "#fffbe6",
      border: "#ffe58f",
    },
    {
      title: "Tổng công nợ khách hàng",
      value: `${formatCurrency(statisticOverview.customer_debt || 0)}`,
      icon: <CreditCardOutlined style={{ fontSize: 24, color: "#f5222d" }} />,
      bg: "#fff1f0",
      border: "#ffa39e",
    },
    {
      title: "Tổng công nợ (NCC)",
      value: `${formatCurrency(statisticOverview.supplier_debt || 0)}`,
      icon: <CreditCardOutlined style={{ fontSize: 24, color: "#f5222d" }} />,
      bg: "#FFF0F5",
      border: "#ffa39e",
    },
  ];

  const renderCustomLabel = ({ name, value }) =>
    `${name}: ${formatCurrency(value)}`;

  const formatCompactNumber = (value) => {
    if (value >= 1_000_000)
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + " triệu";
    if (value >= 1_000)
      return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return value.toString();
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>Chọn khoảng thời gian: </span>
        <RangePicker onChange={(dates) => setDateRange(dates)}></RangePicker>
      </Space>
      <Row gutter={16}>
        {statCards.map((card, index) => (
          <Col span={6} key={index}>
            <Card
              variant="borderless"
              style={{
                marginBottom: "10px",
                backgroundColor: card.bg,
                borderLeft: `6px solid ${card.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>{card.icon}</Col>
                <Col>
                  <Title level={5} style={{ margin: 0 }}>
                    {card.title}
                  </Title>
                  <Title level={4} style={{ margin: 0 }}>
                    {card.value}
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Doanh thu theo tháng">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByMonth}>
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCompactNumber(value)} />
                <Tooltip formatter={(value) => `${formatCurrency(value)}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tỷ lệ công nợ">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={debtData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={renderCustomLabel}
                >
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
