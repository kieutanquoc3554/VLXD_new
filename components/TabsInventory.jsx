import { Table, Tabs } from "antd";
import StockCheckForm from "./StockCheckForm";
import InventoryStockCheckHistory from "./InventoryStockCheckHistory";
import ColumnImportSlips from "./ColumnImportSlips";

const TabsInventory = ({
  ColumnInventory,
  handleEditModal,
  inventory,
  importSlips,
  isLoading,
  ColumnInventoryLogs,
  inventoryLogs,
}) => {
  const items = [
    {
      key: "1",
      label: "Tất cả sản phẩm",
      children: (
        <Table
          columns={ColumnInventory(handleEditModal)}
          dataSource={inventory}
          rowKey="id"
          loading={isLoading}
        />
      ),
    },
    {
      key: "2",
      label: "Sản phẩm sắp hết hàng",
      children: (
        <Table
          columns={ColumnInventory(handleEditModal)}
          dataSource={inventory.filter((i) => i.quantity < 10)}
          rowKey="id"
          loading={isLoading}
        />
      ),
    },
    {
      key: "3",
      label: "Lịch sử biến động kho hàng",
      children: (
        <Table
          columns={ColumnInventoryLogs()}
          dataSource={inventoryLogs}
          rowKey="id"
          loading={isLoading}
        />
      ),
    },
    {
      key: "4",
      label: "Phiếu nhập",
      children: (
        <Table
          columns={ColumnImportSlips()}
          rowKey="id"
          dataSource={importSlips}
        />
      ),
    },
    {
      key: "5",
      label: "Lập báo cáo kiểm kho",
      children: <StockCheckForm data={inventory} loading={isLoading} />,
    },
    {
      key: "6",
      label: "Lịch sử kiểm kho",
      children: <InventoryStockCheckHistory />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default TabsInventory;
