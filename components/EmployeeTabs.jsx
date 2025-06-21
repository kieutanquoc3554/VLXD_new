import { Table, Tabs } from "antd";

const { TabPane } = Tabs;

const EmployeeTabs = ({
  EmployeeColumn,
  handleUpdateEmployee,
  handleSuspendEmployee,
  handleRestoreEmployee,
  handleDeleteEmployee,
  employees,
  deletedEmployees,
  isLoading,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Danh sách nhân viên" key="1">
        <Table
          columns={EmployeeColumn({
            type: "active",
            handleUpdateEmployee,
            handleSuspendEmployee,
            handleRestoreEmployee,
            handleDeleteEmployee,
          })}
          dataSource={employees}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
      <TabPane tab="Danh sách nhân viên đã xóa" key="2">
        <Table
          columns={EmployeeColumn({
            type: "deleted",
            handleUpdateEmployee,
            handleSuspendEmployee,
            handleRestoreEmployee,
            handleDeleteEmployee,
          })}
          dataSource={deletedEmployees}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
    </Tabs>
  );
};

export default EmployeeTabs;
