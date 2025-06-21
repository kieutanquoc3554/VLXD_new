import moment from "moment";
import formatCurrency from "@/utils/formatCurrency";
import { Button, Flex, message, Modal, Select, Tag } from "antd";
import { order } from "@/utils/order";
import axios from "axios";

const ColumnOrders = ({
  form,
  handleStatusChange,
  setIsDetailsModalOpen,
  fetchOrderById,
  fetchOrders,
}) => {
  const { getColorLabel, getStatus } = order();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleViewDetails = async (order) => {
    setIsDetailsModalOpen(true);
    const response = await fetchOrderById(order.id);
    const details = response[0];
    form.setFieldsValue({
      ...details,
      order_date: moment(order.order_date).format("DD/MM/YYYY"),
    });
  };

  const handleCancelOrder = async (order) => {
    Modal.confirm({
      title: "Xác nhận huỷ đơn hàng",
      content:
        "Bạn đang thực hiện thao tác huỷ bỏ đơn hàng, đơn hàng sẽ không hoàn tác. Bạn có xác nhận muốn huỷ?",
      cancelText: "Huỷ bỏ",
      okText: "Xác nhận",
      async onOk() {
        try {
          const response = await axios.put(
            `${apiUrl}/api/orders/${order.id}/cancel`,
            {},
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            message.success(response.data.message);
            await fetchOrders();
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <Tag color={getColorLabel(value)}>{getStatus(value)}</Tag>
      ),
    },
    {
      title: "Tổng giá trị đơn hàng",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex align="center" gap={5}>
          <Select
            placeholder="Đổi trạng thái"
            value={record.status}
            style={{ width: 130 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Select.Option value="Pending">Đang chờ xác nhận</Select.Option>
            <Select.Option value="Processing">Đang xử lý</Select.Option>
            <Select.Option value="Completed">Hoàn tất</Select.Option>
            <Select.Option value="Cancelled">Đã huỷ</Select.Option>
          </Select>
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleCancelOrder(record)}
          >
            Huỷ đơn hàng
          </Button>
        </Flex>
      ),
    },
  ];
};

export default ColumnOrders;
