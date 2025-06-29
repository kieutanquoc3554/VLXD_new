import { Table, Tabs } from "antd";
const { TabPane } = Tabs;

const SupplierTabs = ({
  loading,
  columns,
  columnsDeleted,
  deletedSuppliers,
  suppliers,
  isSearching,
  searchedSupplier,
  searchTerm,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Danh sách nhà cung cấp" key="1">
        <Table
          columns={columns}
          dataSource={
            searchTerm ? searchedSupplier.filter((s) => !s.deleted) : suppliers
          }
          loading={searchTerm ? isSearching : loading}
          rowKey="id"
        />
      </TabPane>
      <TabPane tab="Danh sách nhà cung cấp đã xoá" key="2">
        <Table
          columns={columnsDeleted}
          dataSource={
            searchTerm
              ? searchedSupplier.filter((s) => s.deleted)
              : deletedSuppliers
          }
          loading={searchTerm ? isSearching : loading}
          rowKey="id"
        />
      </TabPane>
    </Tabs>
  );
};

export default SupplierTabs;
