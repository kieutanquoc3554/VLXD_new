import db from "../lib/db";

export const getAllDebts = async () => {
  const sql = `SELECT o.id AS order_id, c.id AS customer_id, c.name AS customer_name, o.total_price,
  o.paid_amount, (o.total_price - o.paid_amount) AS remaining_debt, o.order_date
  FROM orders o 
  JOIN customer c ON o.customer_id = c.id
  ORDER BY o.order_date DESC`;
  const [debt] = await db.query(sql);
  return debt;
};

export const getDebtsByOrderId = async (order_id) => {
  const orderSql = `SELECT o.*, c.name AS customer_name, c.phone AS customer_phone, p.payment_method
                    FROM orders o 
                    JOIN customer c ON o.customer_id = c.id
                    JOIN payments p ON p.order_id = o.id
                    WHERE o.id = ?`;
  const [order] = await db.query(orderSql, [order_id]);
  const detailOrderSql = `SELECT oi.quantity, p.name AS product_name, 
                          ct.name AS product_category, s.name AS product_supplier, 
                          p.price, p.image_url, (oi.quantity * p.price) AS total_price
                          FROM order_items oi 
                          JOIN products p ON oi.product_id = p.id
                          JOIN categories ct ON ct.id = p.category_id
                          JOIN suppliers s ON s.id = p.supplier_id
                          WHERE oi.order_id = ?`;
  const [items] = await db.query(detailOrderSql, [order_id]);
  const historyDebtSql = `SELECT * FROM payments WHERE order_id = ?`;
  const [history] = await db.query(historyDebtSql, [order_id]);
  const debtMap = order.map((o) => {
    return { ...o, items, history };
  });
  return debtMap[0];
};

export const getSupplierDebts = async () => {
  const sql = `SELECT st.id, s.id AS supplier_id, s.name AS supplier_name, islip.created_at AS import_date, 
                st.amount, st.paid_amount, st.remaining_amount, st.status
                FROM supplier_transactions st 
                JOIN suppliers s ON st.supplier_id = s.id
                JOIN import_slips islip ON st.import_slip_id = islip.id
                ORDER BY islip.created_at DESC`;
  const [supplierDebts] = await db.query(sql);
  return supplierDebts;
};

export const searchDebts = async (query) => {
  const likeQuery = `%${query}%`;
  const customerSearchQuery = `SELECT o.id AS order_id, c.id AS customer_id, c.name AS customer_name, o.total_price,
                                o.paid_amount, (o.total_price - o.paid_amount) AS remaining_debt, o.order_date
                                FROM orders o 
                                JOIN customer c ON o.customer_id = c.id
                                WHERE c.name LIKE ?
                                ORDER BY o.order_date DESC`;
  const supplierSearchQuery = `SELECT st.id, s.id AS supplier_id, s.name AS supplier_name, islip.created_at AS import_date, 
                                st.amount, st.paid_amount, st.remaining_amount, st.status
                                FROM supplier_transactions st 
                                JOIN suppliers s ON st.supplier_id = s.id
                                JOIN import_slips islip ON st.import_slip_id = islip.id
                                WHERE s.name LIKE ?
                                ORDER BY islip.created_at DESC`;
  const [customerDebt] = await db.query(customerSearchQuery, [likeQuery]);
  const [supplierDebt] = await db.query(supplierSearchQuery, [likeQuery]);
  return { customer: customerDebt, supplier: supplierDebt };
};

export const filterDebtByDate = async (date) => {
  const customerSearchQuery = `SELECT o.id AS order_id, c.id AS customer_id, c.name AS customer_name, o.total_price,
                                o.paid_amount, (o.total_price - o.paid_amount) AS remaining_debt, o.order_date
                                FROM orders o 
                                JOIN customer c ON o.customer_id = c.id
                                WHERE DATE(o.order_date) = ?
                                ORDER BY o.order_date DESC`;
  const supplierSearchQuery = `SELECT st.id, s.id AS supplier_id, s.name AS supplier_name, islip.created_at AS import_date, 
                                st.amount, st.paid_amount, st.remaining_amount, st.status
                                FROM supplier_transactions st 
                                JOIN suppliers s ON st.supplier_id = s.id
                                JOIN import_slips islip ON st.import_slip_id = islip.id
                                WHERE DATE(islip.created_at) = ?
                                ORDER BY islip.created_at DESC`;
  const [customerDebt] = await db.query(customerSearchQuery, [date]);
  const [supplierDebt] = await db.query(supplierSearchQuery, [date]);
  return { customer: customerDebt, supplier: supplierDebt };
};

export const filterDebtByStatus = async (status) => {
  let customerSearchQuery = `SELECT o.id AS order_id, c.id AS customer_id, c.name AS customer_name, o.total_price,
                                o.paid_amount, (o.total_price - o.paid_amount) AS remaining_debt, o.order_date
                                FROM orders o 
                                JOIN customer c ON o.customer_id = c.id
                                WHERE 1 = 1 `;
  let supplierSearchQuery = `SELECT st.id, s.id AS supplier_id, s.name AS supplier_name, islip.created_at AS import_date, 
                                st.amount, st.paid_amount, st.remaining_amount, st.status
                                FROM supplier_transactions st 
                                JOIN suppliers s ON st.supplier_id = s.id
                                JOIN import_slips islip ON st.import_slip_id = islip.id
                                WHERE 1 = 1 `;
  const paramsCustomer = [];
  const paramsSupplier = [];
  if (status == "paid") {
    customerSearchQuery += " AND o.total_price = o.paid_amount";
    supplierSearchQuery += ' AND st.status = "paid"';
  } else if (status == "unpaid") {
    customerSearchQuery += " AND o.total_price > o.paid_amount";
    supplierSearchQuery += " AND st.status = 'partial'";
  }
  customerSearchQuery += " ORDER BY o.order_date DESC";
  supplierSearchQuery += " ORDER BY islip.created_at DESC";

  const [customerDebt] = await db.query(customerSearchQuery, paramsCustomer);
  const [supplierDebt] = await db.query(supplierSearchQuery, paramsSupplier);
  return { customer: customerDebt, supplier: supplierDebt };
};

export const getTransactionById = async (transactionId) => {
  const transactionSQL = `SELECT st.*, s.name AS supplier_name, s.phone,  islip.note, islip.created_at
                          FROM supplier_transactions st
                          JOIN suppliers s ON st.supplier_id = s.id
                          JOIN import_slips islip ON st.import_slip_id = islip.id
                          WHERE st.id = ?`;
  const [transaction] = await db.query(transactionSQL, [transactionId]);
  return transaction[0];
};

export const getImportSlipItems = async (importSlipId) => {
  const sql = `SELECT isi.*, p.name, p.image_url, c.name AS category_name FROM import_slip_items isi 
              JOIN products p ON p.id = isi.product_id
              LEFT JOIN categories c ON c.id = p.category_id
              WHERE isi.import_slip_id = ?`;
  const [items] = await db.query(sql, [importSlipId]);
  return items;
};

export const getPaymentsByTransactionId = async (transactionId) => {
  const sql = `SELECT * FROM supplier_payment WHERE supplier_transactions_id = ?`;
  const [rows] = await db.query(sql, [transactionId]);
  return rows;
};
