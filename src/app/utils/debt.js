export const debt = () => {
  const statuses = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    partial: "Đã thanh toán một phần",
  };

  const getStatusDebt = (status) => statuses[status] || "Chưa thanh toán";

  return { getStatusDebt, statuses };
};
