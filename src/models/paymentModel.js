const db = require("../utils/db");

exports.createPayment = async (order_id, payment_method, amount) => {
  const sql = `INSERT INTO payments (order_id, payment_method, amount) VALUES (?, ?, ?)`;
  await db.query(sql, [order_id, payment_method, amount]);
  return { message: "Thanh toán thành công!" };
};

exports.getPaymentByOrder = async (order_id) => {
  const [row] = await db.query(`SELECT * FROM payments WHERE order_id = ?`, [
    order_id,
  ]);
  return row;
};
