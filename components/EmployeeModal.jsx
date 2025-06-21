import { Modal } from "antd";
import EmployeeForm from "./EmployeeForm";

const EmployeeModal = ({
  form,
  selectedEmployee,
  isOpenModal,
  setIsOpenModal,
  handleSubmit,
}) => {
  return (
    <Modal
      title={
        selectedEmployee
          ? "Chỉnh sửa thông tin nhân viên"
          : "Thêm nhân viên mới"
      }
      open={isOpenModal}
      onCancel={() => setIsOpenModal(false)}
      footer={null}
    >
      <EmployeeForm
        form={form}
        handleSubmit={handleSubmit}
        selectedEmployee={selectedEmployee}
      />
    </Modal>
  );
};

export default EmployeeModal;
