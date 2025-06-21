import { Modal } from "antd";
import SupplierForm from "./SupplierForm";

const SupplierModal = ({
  form,
  selectedSupplier,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}) => {
  return (
    <Modal
      title={selectedSupplier ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <SupplierForm
        form={form}
        handleSubmit={handleSubmit}
        selectedSupplier={selectedSupplier}
      />
    </Modal>
  );
};

export default SupplierModal;
