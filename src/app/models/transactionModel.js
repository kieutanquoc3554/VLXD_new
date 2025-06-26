const db = require("../utils/db");

exports.createTransaction = async ({
  product_id,
  transaction_type,
  quantity,
  employee_id,
}) => {
  const sql = `INSERT INTO transactions (product_id, transaction_type, quantity, employee_id, transaction_date) 
  VALUES (?, ?, ?, ?, NOW())`;
  await db.query(sql, [product_id, transaction_type, quantity, employee_id]);
};
