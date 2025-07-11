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
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    statisticOverview,
    statisticByMonthOverview,
    statisticByDateOverview,
    fetchStatisticOverview,
    fetchStatisticByMonthOverview,
    fetchStatisticByDateOverview,
  } = useStatistic();
  const COLORS = ["#0088FE", "#FF8042"];

  const monthFY = Array.from({ length: 12 }, (_, i) => ({
    month: `Th${i + 1}`,
    revenue: 0,
  }));

  const debtData = [
    { name: "Khách hàng", value: Number(statisticOverview.customer_debt) },
    { name: "Nhà cung cấp", value: Number(statisticOverview.supplier_debt) },
  ];

  useEffect(() => {
    fetchStatisticOverview();
    fetchStatisticByMonthOverview();
  }, []);

  useEffect(() => {
    if (statisticByMonthOverview) {
      const parsedData = Object.values(statisticByMonthOverview).map(
        (item) => ({
          month: Number(item.month),
          revenue: Number(item.total_amount),
        })
      );
      const actualData = monthFY.map((monthData, index) => {
        const found = parsedData.find((d) => d.month === index + 1);
        return {
          month: monthData.month,
          revenue: found ? found.revenue : 0,
        };
      });

      setRevenueByMonth(actualData);
    }
  }, [statisticByMonthOverview]);

  useEffect(() => {
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      setStartDate(start);
      setEndDate(end);
      fetchStatisticByDateOverview(start, end);
    }
  }, [dateRange]);

  const statCards = [
    {
      title: "Doanh thu (theo đơn hàng)",
      value: `${formatCurrency(
        statisticByDateOverview.total_revenue != null
          ? statisticByDateOverview.total_revenue
          : statisticOverview.total_revenue || 0
      )}`,
      icon: <MoneyCollectOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      bg: "#f6ffed",
      border: "#b7eb8f",
    },
    {
      title: "Doanh thu (thực tế)",
      value: `${formatCurrency(
        statisticByDateOverview.actual_revenue != null
          ? statisticByDateOverview.actual_revenue
          : statisticOverview.actual_revenue || 0
      )}`,
      icon: <MoneyCollectOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      bg: "#f6ffed",
      border: "#b7eb8f",
    },
    {
      title: "Tổng lợi nhuận",
      value: `${formatCurrency(
        statisticByDateOverview.profit != null
          ? statisticByDateOverview.profit
          : statisticOverview.profit || 0
      )}`,
      icon: <RiseOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      bg: "#e6f7ff",
      border: "#91d5ff",
    },
    {
      title: "Giá trị tồn kho",
      value: `${formatCurrency(
        statisticByDateOverview.total_inventory != null
          ? statisticByDateOverview.total_inventory
          : statisticOverview.total_inventory || 0
      )}`,
      icon: <InboxOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      bg: "#fffbe6",
      border: "#ffe58f",
    },
    {
      title: "Tổng công nợ khách hàng",
      value: `${formatCurrency(
        statisticByDateOverview.customer_debt != null
          ? statisticByDateOverview.customer_debt
          : statisticOverview.customer_debt || 0
      )}`,
      icon: <CreditCardOutlined style={{ fontSize: 24, color: "#f5222d" }} />,
      bg: "#fff1f0",
      border: "#ffa39e",
    },
    {
      title: "Tổng công nợ (NCC)",
      value: `${formatCurrency(
        statisticByDateOverview.supplier_debt != null
          ? statisticByDateOverview.supplier_debt
          : statisticOverview.supplier_debt || 0
      )}`,
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
        <RangePicker
          onChange={(dates) => {
            if (dates && dates.length === 2) {
              const start = dates[0]
                .startOf("day")
                .format("YYYY-MM-DD HH:mm:ss");
              const end = dates[1].endOf("day").format("YYYY-MM-DD HH:mm:ss");
              const range = [start, end];
              setDateRange(range);
            }
          }}
        />
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
                <Bar name="Doanh thu" dataKey="revenue" fill="#1890ff" />
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
