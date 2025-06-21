import { Table, Tabs } from "antd";
import ColumnsDebt from "./ColumnsDebt";
import ColumnSupplierDebt from "./ColumnSupplierDebt";

const { TabPane } = Tabs;

const TabsDebt = ({
  setSelectedTab,
  supplierDebt,
  debt,
  handleViewDetails,
  handleViewSupplierDebtDetails,
  filteredCustomerDebt,
  filteredSupplierDebt,
  filteredCustomerByDate,
  filteredSupplierByDate,
  isSearched,
  date,
}) => {
  return (
    <Tabs defaultActiveKey="1" onChange={setSelectedTab}>
      <TabPane key="1" tab="Công nợ khách hàng">
        <Table
          dataSource={
            isSearched
              ? date
                ? filteredCustomerByDate
                : filteredCustomerDebt
              : debt
          }
          columns={ColumnsDebt(handleViewDetails)}
        />
      </TabPane>
      <TabPane key="2" tab="Công nợ nhà cung cấp">
        <Table
          dataSource={
            isSearched
              ? date
                ? filteredSupplierByDate
                : filteredSupplierDebt
              : supplierDebt
          }
          columns={ColumnSupplierDebt(handleViewSupplierDebtDetails)}
        />
      </TabPane>
    </Tabs>
  );
};

export default TabsDebt;
