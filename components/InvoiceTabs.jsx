import { Table, Tabs } from "antd";
import ColumnBill from "./ColumnBill";

const InvoiceTabs = ({
  selectedTab,
  setSelectedTab,
  searchTerm,
  filtered,
  filteredInvoice,
  filteredCustomerInvoice,
  filteredSupplierInvoice,
  invoice,
  customerInvoice,
  supplierInvoice,
}) => {
  return (
    <>
      <Tabs defaultActiveKey={selectedTab} onChange={setSelectedTab}>
        <Tabs.TabPane tab="Tất cả hoá đơn" key="1">
          <Table
            dataSource={searchTerm || filtered ? filteredInvoice : invoice}
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hoá đơn khách hàng" key="2">
          <Table
            dataSource={
              searchTerm || filtered ? filteredCustomerInvoice : customerInvoice
            }
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hoá đơn nhà cung cấp" key="3">
          <Table
            dataSource={
              searchTerm || filtered ? filteredSupplierInvoice : supplierInvoice
            }
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default InvoiceTabs;
