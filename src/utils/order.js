export const order = () => {
  const status = {
    Pending: "#FFA500",
    Processing: "#1890FF",
    Completed: "#52C41A",
    Cancelled: "#FF4D4F",
  };

  const getColorLabel = (value) => status[value] || "FF4F4F";

  const statusNormalization = {
    Pending: "Đang chờ xử lý",
    Processing: "Đang xử lý",
    Completed: "Đã hoàn thành",
    Cancelled: "Đã huỷ",
  };

  const getStatus = (value) => statusNormalization[value] || "Đang chờ xử lý";

  const paymentMethod = {
    Cash: "Tiền mặt",
    Banking: "Chuyển khoản",
  };

  const getPaymentMethod = (method) =>
    paymentMethod[method] || "Không xác định";

  const statusPriority = {
    Pending: 1,
    Processing: 2,
    Completed: 3,
    Cancelled: 0,
  };

  return { getColorLabel, getPaymentMethod, getStatus, statusPriority };
};
