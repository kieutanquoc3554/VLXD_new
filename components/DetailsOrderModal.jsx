import { Modal } from "antd";
import DetailsOrderForm from "./DetailsOrderForm";

const DetailsOrderModal = ({
  form,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
}) => {
  return (
    <Modal
      title={"Chi tiết đơn hàng"}
      open={isDetailsModalOpen}
      onCancel={() => setIsDetailsModalOpen(false)}
      footer={null}
      width={1000}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
        paddingRight: "16px",
      }}
    >
      <DetailsOrderForm form={form} />
    </Modal>
  );
};

export default DetailsOrderModal;
