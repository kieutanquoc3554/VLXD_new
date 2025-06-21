import { Button, Flex, Tag } from "antd";
import dayjs from "dayjs";

const EmployeeColumn = ({
  type = "active",
  handleUpdateEmployee,
  handleSuspendEmployee,
  handleRestoreEmployee,
  handleDeleteEmployee,
}) => {
  return [
    { title: "ID người dùng", dataIndex: "id", key: "id" },
    { title: "Tên người dùng", dataIndex: "name", key: "name" },
    { title: "Chức vụ", dataIndex: "role", key: "role" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ email", dataIndex: "email", key: "email" },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "suspended_permanently",
      key: "suspended_permanently",
      render: (_, record) => {
        let status = "Đang hoạt động";
        let colorText = "green";
        if (record.suspended_permanently === 1) {
          status = "Đình chỉ vĩnh viễn";
          colorText = "red";
        } else if (record.suspended_until) {
          if (
            dayjs(record.suspended_until)
              .locale("vi")
              .isBefore(dayjs().locale("vi"))
          ) {
            status = "Đang hoạt động";
            colorText = "green";
          } else {
            status = `Tài khoản đình chỉ đến ngày ${dayjs(
              record.suspended_until
            )
              .locale("vi")
              .format("DD/MM/YYYY")}`;
            colorText = "orange";
          }
        }
        return <Tag color={colorText}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        if (type === "active") {
          return (
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => handleUpdateEmployee(record)}
              >
                Cập nhật
              </Button>
              <Button
                type="default"
                danger
                style={{ color: "#faad14", borderColor: "#faad14" }}
                onClick={() => handleSuspendEmployee(record)}
              >
                Đình chỉ
              </Button>
              <Button
                type="primary"
                onClick={() => handleDeleteEmployee(record.id)}
                danger
              >
                Xóa
              </Button>
            </Flex>
          );
        } else if (type === "deleted") {
          return (
            <Button
              type="dashed"
              onClick={() => handleRestoreEmployee(record.id)}
            >
              Khôi phục
            </Button>
          );
        }
      },
    },
  ];
};

export default EmployeeColumn;
