import { Table, Tabs } from "antd";

const OrderTabs = ({
  orders,
  isLoading,
  ColumnOrders,
  form,
  handleStatusChange,
  setIsDetailsModalOpen,
  fetchOrderById,
  fetchOrders,
  detailsOrder,
  isSearched,
  searchedOrder,
}) => {
  const pendingOrder = isSearched
    ? searchedOrder.filter((o) => o.status === "Pending")
    : orders.filter((o) => o.status === "Pending");
  const processingOrder = isSearched
    ? searchedOrder.filter((o) => o.status === "Processing")
    : orders.filter((o) => o.status === "Processing");
  const completedOrder = isSearched
    ? searchedOrder.filter((o) => o.status === "Completed")
    : orders.filter((o) => o.status === "Completed");
  const cancelledOrder = isSearched
    ? searchedOrder.filter((o) => o.status === "Cancelled")
    : orders.filter((o) => o.status === "Cancelled");
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Tất cả đơn hàng" key="1">
        <Table
          dataSource={isSearched ? searchedOrder : orders}
          loading={isLoading}
          columns={ColumnOrders({
            form,
            handleStatusChange,
            setIsDetailsModalOpen,
            fetchOrderById,
            detailsOrder,
            fetchOrders,
          })}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn hàng đang chờ" key="2">
        <Table
          dataSource={pendingOrder}
          loading={isLoading}
          columns={ColumnOrders({
            form,
            handleStatusChange,
            setIsDetailsModalOpen,
            fetchOrderById,
            detailsOrder,
            fetchOrders,
          })}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn hàng đang xử lý" key="3">
        <Table
          dataSource={processingOrder}
          loading={isLoading}
          columns={ColumnOrders({
            form,
            handleStatusChange,
            setIsDetailsModalOpen,
            fetchOrderById,
            detailsOrder,
            fetchOrders,
          })}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn hàng đã hoàn tất" key="4">
        <Table
          dataSource={completedOrder}
          loading={isLoading}
          columns={ColumnOrders({
            form,
            handleStatusChange,
            setIsDetailsModalOpen,
            fetchOrderById,
            detailsOrder,
            fetchOrders,
          })}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn hàng đã huỷ" key="5">
        <Table
          dataSource={cancelledOrder}
          loading={isLoading}
          columns={ColumnOrders({
            form,
            handleStatusChange,
            setIsDetailsModalOpen,
            fetchOrderById,
            detailsOrder,
            fetchOrders,
          })}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default OrderTabs;
