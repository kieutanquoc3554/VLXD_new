const formatCurrency = (value) => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export default formatCurrency;
