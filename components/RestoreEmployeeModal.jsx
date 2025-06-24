import { message, Modal } from "antd";
import axios from "axios";

export const RestoreEmployeeModal = ({ fetchEmployees }) => {
  return Modal.confirm({
    title: "Xác nhận khôi phục?",
    content: "Bạn có chắc chắn muốn khôi phục người dùng này không?",
    okText: "Xác nhận",
    cancelText: "Huỷ",
    async onOk() {
      try {
        const response = await axios.post(`/api/employee/restore/${id}`, {});
        if (response.status === 200) {
          message.success("Đã khôi phục thành công");
          fetchEmployees();
        } else {
          message.error("Có lỗi xảy ra!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });
};
