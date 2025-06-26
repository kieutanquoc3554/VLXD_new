const db = require("../utils/db");

exports.createSupplierPayment = async (transactionId, amount, note) => {
  const insertSQL = `INSERT INTO supplier_payment (supplier_transactions_id, amount, note) VALUES (?, ?, ?)`;
  await db.query(insertSQL, [
    transactionId,
    amount,
    note || "Thanh toán đơn hàng",
  ]);
  const updateSQL = `UPDATE supplier_transactions SET paid_amount = paid_amount + ?, 
                    remaining_amount = remaining_amount - ?,
                    status = CASE 
                        WHEN remaining_amount - ? <= 0 THEN 'paid'
                        ELSE 'partial'
                    END 
                    WHERE id = ?`;
  await db.query(updateSQL, [amount, amount, amount, transactionId]);
};
