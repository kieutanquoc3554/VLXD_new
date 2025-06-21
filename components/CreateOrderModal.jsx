import { Modal } from "antd";
import CreateOrderForm from "./CreateOrderForm";

const CreateOrderModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      title="Tạo đơn hàng mới"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
        paddingRight: "16px",
      }}
    >
      <CreateOrderForm onSuccess={() => setIsModalOpen(false)} />
    </Modal>
  );
};

export default CreateOrderModal;
