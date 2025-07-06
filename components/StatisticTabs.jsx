import { Tabs } from "antd";
import DashboardOverview from "./DashboardOverview";
const { TabPane } = Tabs;

const StatisticTabs = () => {
  return (
    <Tabs defaultActiveKey="summary">
      <TabPane tab="Thống kê tổng quan" key="summary">
        <DashboardOverview />
      </TabPane>
      <TabPane tab="Thống kê doanh thu" key="revenue"></TabPane>
      <TabPane tab="Thống kê công nợ" key="debt"></TabPane>
      <TabPane tab="Thống kê tồn kho" key="inventory"></TabPane>
    </Tabs>
  );
};

export default StatisticTabs;
