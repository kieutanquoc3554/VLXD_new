"use client";
import { message, Modal } from "antd";
import axios from "axios";

const useEmployeeHandler = ({
  form,
  setIsOpenModal,
  setSelectedEmployee,
  setIsOpenSuspendModal,
  setIsOpenRestoreModal,
  fetchEmployees,
  selectedEmployee,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleAddEmployee = () => {
    setIsOpenModal(true);
    form.resetFields();
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = (values) => {
    setIsOpenModal(true);
    form.setFieldsValue(values);
    setSelectedEmployee(values);
  };

  const handleSuspendEmployee = (values) => {
    setIsOpenSuspendModal(true);
    setSelectedEmployee(values);
  };

  const handleRestoreEmployee = (id) => {
    console.log("Đang chạy");

    Modal.confirm({
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

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await axios.post(
        `/api/employee/delete/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        message.success("Xóa thành công nhân viên");
        fetchEmployees();
      } else {
        message.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      message.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedEmployee) {
        await axios.post(`/api/employee/update/${selectedEmployee.id}`, values);
        message.success("Cập nhật thông tin nhân viên thành công!");
      } else {
        await axios.post(`${apiUrl}/api/auth/register`, values);
        message.success("Tạo tài khoản thành công!");
      }
      fetchEmployees();
      setIsOpenModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error);

        message.error(error.response.data.message || "Đã xảy ra lỗi!");
      } else {
        message.error("Lỗi kết nối đến server!");
      }
    }
  };

  return {
    handleAddEmployee,
    handleUpdateEmployee,
    handleSuspendEmployee,
    handleRestoreEmployee,
    handleDeleteEmployee,
    handleSubmit,
  };
};

export default useEmployeeHandler;
