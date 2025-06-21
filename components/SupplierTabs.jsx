import { Table, Tabs } from "antd";
const { TabPane } = Tabs;

const SupplierTabs = ({
  loading,
  columns,
  columnsDeleted,
  deletedSuppliers,
  suppliers,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Danh sách nhà cung cấp" key="1">
        <Table
          columns={columns}
          dataSource={suppliers}
          loading={loading}
          rowKey="id"
        />
      </TabPane>
      <TabPane tab="Danh sách nhà cung cấp đã xoá" key="2">
        <Table
          columns={columnsDeleted}
          dataSource={deletedSuppliers}
          loading={loading}
          rowKey="id"
        />
      </TabPane>
    </Tabs>
  );
};

export default SupplierTabs;
