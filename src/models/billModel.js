import db from "@/hook/lib/db";

export const getAllBill = async () => {
  const customerQuery = `SELECT p.*, c.name AS customer_name,o.total_price, o.paid_amount, o.remaining_amount 
                        FROM payments p 
                        JOIN orders o ON p.order_id = o.id 
                        JOIN customer c ON o.customer_id = c.id
                        ORDER BY p.payment_date DESC;`;

  const supplierQuery = `SELECT sp.id, sp.supplier_transactions_id, sp.payment_date, sp.note, sp.amount AS amount_payment,st.amount, st.paid_amount, st.remaining_amount, s.name AS supplier_name 
                        FROM supplier_payment sp
                        JOIN supplier_transactions st ON sp.supplier_transactions_id = st.id
                        JOIN suppliers s ON st.supplier_id = s.id
                        ORDER BY sp.payment_date DESC;`;

  const [customerPayments] = await db.query(customerQuery);
  const [supplierPayments] = await db.query(supplierQuery);

  const normalizedCustomer = customerPayments.map((p) => ({
    id: p.id,
    type: "customer",
    name: p.customer_name,
    paymentDate: p.payment_date,
    totalAmount: p.total_price,
    paidAmount: p.amount,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.order_id,
    note: p.note || "",
  }));

  const normalizedSupplier = supplierPayments.map((p) => ({
    id: p.id,
    type: "supplier",
    name: p.supplier_name,
    paymentDate: p.payment_date,
    totalAmount: p.amount,
    paidAmount: p.amount_payment,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.supplier_transactions_id,
    note: p.note || "",
  }));

  return [...normalizedCustomer, ...normalizedSupplier];
};

export const searchBill = async (query) => {
  const likeQuery = `%${query}%`;

  const customerQuery = `
    SELECT p.*, c.name AS customer_name, o.total_price, o.paid_amount, o.remaining_amount
    FROM payments p
    JOIN orders o ON p.order_id = o.id
    JOIN customer c ON o.customer_id = c.id
    WHERE p.id LIKE ? 
    OR c.name LIKE ?
    ORDER BY p.payment_date DESC;
  `;

  const supplierQuery = `
    SELECT sp.id, sp.supplier_transactions_id, sp.payment_date, sp.note, sp.amount AS amount_payment,st.amount, st.paid_amount, st.remaining_amount, s.name AS supplier_name 
                        FROM supplier_payment sp
                        JOIN supplier_transactions st ON sp.supplier_transactions_id = st.id
                        JOIN suppliers s ON st.supplier_id = s.id
    WHERE sp.id LIKE ?
    OR s.name LIKE ?
    ORDER BY sp.payment_date DESC;
  `;

  const [customerPayments] = await db.query(customerQuery, [
    likeQuery,
    likeQuery,
    likeQuery,
    likeQuery,
  ]);

  const [supplierPayments] = await db.query(supplierQuery, [
    likeQuery,
    likeQuery,
    likeQuery,
    likeQuery,
  ]);

  const normalizedCustomer = customerPayments.map((p) => ({
    id: p.id,
    type: "customer",
    name: p.customer_name,
    paymentDate: p.payment_date,
    totalAmount: p.total_price,
    paidAmount: p.amount,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.order_id,
    note: p.note || "",
  }));

  const normalizedSupplier = supplierPayments.map((p) => ({
    id: p.id,
    type: "supplier",
    name: p.supplier_name,
    paymentDate: p.payment_date,
    totalAmount: p.amount,
    paidAmount: p.amount_payment,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.supplier_transactions_id,
    note: p.note || "",
  }));

  return {
    all: [...normalizedCustomer, ...normalizedSupplier],
    customer: normalizedCustomer,
    supplier: normalizedSupplier,
  };
};

export const filterBillByDate = async (date) => {
  const customerQuery = `
    SELECT p.*, c.name AS customer_name, o.total_price, o.paid_amount, o.remaining_amount
    FROM payments p
    JOIN orders o ON p.order_id = o.id
    JOIN customer c ON o.customer_id = c.id
    WHERE DATE(p.payment_date) = ? 
    ORDER BY p.payment_date DESC;
  `;

  const supplierQuery = `
    SELECT sp.id, sp.supplier_transactions_id, sp.payment_date, sp.note, sp.amount AS amount_payment,st.amount, st.paid_amount, st.remaining_amount, s.name AS supplier_name 
                        FROM supplier_payment sp
                        JOIN supplier_transactions st ON sp.supplier_transactions_id = st.id
                        JOIN suppliers s ON st.supplier_id = s.id
    WHERE DATE(sp.payment_date) = ?
    ORDER BY sp.payment_date DESC;
  `;

  const [customerPayments] = await db.query(customerQuery, [date]);
  const [supplierPayments] = await db.query(supplierQuery, [date]);

  const normalizedCustomer = customerPayments.map((p) => ({
    id: p.id,
    type: "customer",
    name: p.customer_name,
    paymentDate: p.payment_date,
    totalAmount: p.total_price,
    paidAmount: p.amount,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.order_id,
    note: p.note || "",
  }));

  const normalizedSupplier = supplierPayments.map((p) => ({
    id: p.id,
    type: "supplier",
    name: p.supplier_name,
    paymentDate: p.payment_date,
    totalAmount: p.amount,
    paidAmount: p.amount_payment,
    totalPaidAmount: p.paid_amount,
    remainingAmount: p.remaining_amount,
    referenceId: p.supplier_transactions_id,
    note: p.note || "",
  }));

  return {
    all: [...normalizedCustomer, ...normalizedSupplier],
    customer: normalizedCustomer,
    supplier: normalizedSupplier,
  };
};
