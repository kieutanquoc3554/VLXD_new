import db from "../lib/db";

export const getAllInventory = async () => {
  const sql = `SELECT inventory.*, products.name AS product_name, categories.name AS product_category 
  FROM inventory 
  JOIN products ON inventory.product_id = products.id 
  JOIN categories ON products.category_id = categories.id WHERE products.isDeleted = 0 AND products.disabled = 0`;

  const [rows] = await db.query(sql);
  return rows;
};

export const getById = async (id) => {
  const sql = "SELECT * FROM inventory WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows;
};

export const getProductById = async (id) => {
  const sql =
    "SELECT i.*, p.price, p.name FROM inventory i JOIN products p ON i.product_id = p.id WHERE product_id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

export const create = async (data, userId) => {
  const { note = "Nhập kho", items, suppliers_id, paid_amount } = data;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    // Tạo phiếu nhập
    const [importSlipResult] = await connection.query(
      `INSERT INTO import_slips (suppliers_id, note, created_by) VALUES (?, ?, ?)`,
      [suppliers_id, note, userId]
    );
    const importSlipId = importSlipResult.insertId;
    let total_price = 0;
    // Các mặt hàng trong phiếu nhập
    for (const item of items) {
      const { product_id, quantity, unit_price, warehouse_location } = item;
      total_price += quantity * unit_price;
      // Lưu chi tiết phiếu nhập
      await connection.query(
        `INSERT INTO import_slip_items (import_slip_id, product_id, quantity, unit_price, warehouse_location) VALUES (?, ?, ?, ?, ?)`,
        [importSlipId, product_id, quantity, unit_price, warehouse_location]
      );
      // Cập nhật tồn kho
      const [rows] = await connection.query(
        "SELECT * FROM inventory WHERE product_id = ?",
        [product_id]
      );
      if (rows.length > 0) {
        await connection.query(
          `UPDATE inventory SET quantity = quantity + ? WHERE product_id = ?`,
          [quantity, product_id]
        );
      } else {
        await connection.query(
          `INSERT INTO inventory (product_id, quantity, warehouse_location) VALUES (?, ?, ?)`,
          [product_id, quantity, warehouse_location]
        );
      }
      // Cập nhật giá nhập vào
      await connection.query(
        `UPDATE products SET import_price = ? WHERE id = ?`,
        [unit_price, product_id]
      );
      // Ghi log
      await connection.query(
        `INSERT INTO inventory_logs (product_id, type, quantity, note, created_by) VALUE (?, 'import', ?, ?, ?)`,
        [product_id, quantity, `Theo phiếu nhập ${importSlipId}`, userId]
      );
    }
    // Cập nhật tổng tiền cho phiếu nhập
    await connection.query(
      `UPDATE import_slips SET total_price = ? WHERE id = ?`,
      [total_price, importSlipId]
    );
    const remaining_amount = total_price - paid_amount;
    const status =
      remaining_amount <= 0 ? "paid" : paid_amount > 0 ? "partial" : "unpaid";
    // Ghi nhận công nợ nhà cung cấp
    const [supplierTransactionResult] = await connection.query(
      `INSERT INTO supplier_transactions (supplier_id, import_slip_id, amount, paid_amount, remaining_amount, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        suppliers_id,
        importSlipId,
        total_price,
        paid_amount,
        remaining_amount,
        status,
      ]
    );
    const transactionId = supplierTransactionResult.insertId;
    // Ghi nhận lịch sử giao dịch
    await connection.query(
      `INSERT INTO supplier_payment (supplier_transactions_id, amount, note) 
      VALUES (?, ?, ?)`,
      [transactionId, paid_amount, note]
    );
    await connection.commit();
    return { importSlipId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getTotalQuantityByProductId = async (product_id) => {
  const [rows] = await db.query(
    `SELECT SUM(quantity) AS total FROM inventory WHERE product_id = ?`,
    [product_id]
  );
  return rows[0].total || 0;
};

export const update = async (id, data, userId) => {
  const { quantity, warehouse_location } = data;
  const [rows] = await db.query(`SELECT * FROM inventory WHERE id = ?`, [id]);
  if (rows.length === 0) return;
  const oldQuantity = rows[0].quantity;
  const product_id = rows[0].product_id;
  const quantityDiff = quantity - oldQuantity;

  const sql =
    "UPDATE inventory SET quantity = ?, warehouse_location = ? WHERE id = ?";
  await db.query(sql, [quantity, warehouse_location, id]);

  if (quantityDiff !== 0) {
    const sql = `INSERT INTO inventory_logs (product_id, type, quantity, note, created_by) VALUES (?, 'adjustment', ?, ?, ?)`;
    await db.query(sql, [
      product_id,
      quantityDiff,
      `Điều chỉnh số lượng từ ${oldQuantity} → ${quantity}`,
      userId,
    ]);
    const sqlUpdateQuantityProduct = `UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?`;
    await db.query(sqlUpdateQuantityProduct, [quantityDiff, product_id]);
  }
};

export const deleteInv = async (id) => {
  const sql = "DELETE FROM inventory WHERE id = ?";
  await db.query(sql, [id]);
};

export const search = async (keyword) => {
  const sql = `SELECT inventory.*, products.name AS product_name 
  FROM inventory 
  JOIN products ON inventory.product_id = products.id 
  WHERE products.name LIKE ?`;
  const [rows] = await db.query(sql, [`%${keyword}%`]);
  return rows;
};

export const getInventoryLogs = async () => {
  const sql = `SELECT i.*, p.name AS product_name, e.name AS employee_name 
  FROM inventory_logs i 
  JOIN products p ON i.product_id = p.id 
  JOIN employees e ON i.created_by = e.id 
  ORDER BY i.created_at DESC;`;
  const [rows] = await db.query(sql);
  return rows;
};

export const createStockCheck = async (checks, userId) => {
  const [userRows] = await db.query(`SELECT name FROM employees WHERE id = ?`, [
    userId,
  ]);
  const userName = userRows[0]?.name || "Không rõ";
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN");
  const note = `Kiểm kho ngày ${dateStr} do ${userName} kiểm`;
  for (const item of checks) {
    const { product_id, actual_quantity } = item;
    const [systemRow] = await db.query(
      `SELECT SUM(quantity) AS system_quantity FROM inventory WHERE product_id = ?`,
      [product_id]
    );
    const system_quantity = systemRow[0].system_quantity || 0;
    const difference = actual_quantity - system_quantity;
    await db.query(
      `INSERT INTO stock_check_reports (product_id, actual_quantity, system_quantity, difference, note, created_by) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [product_id, actual_quantity, system_quantity, difference, note, userId]
    );
    if (difference !== 0) {
      await db.query(
        `INSERT INTO inventory_logs (product_id, type, quantity, note, created_by) 
        VALUES (?, "adjustment", ?, ?, ?)`,
        [
          product_id,
          difference,
          `Điều chỉnh sau kiểm kho từ ${system_quantity} → ${actual_quantity}`,
          userId,
        ]
      );
      await db.query(`UPDATE products SET stock_quantity = ? WHERE id = ?`, [
        actual_quantity,
        product_id,
      ]);
      await db.query(`UPDATE inventory SET quantity = ? WHERE product_id = ?`, [
        actual_quantity,
        product_id,
      ]);
    }
  }
};

export const getAllStockCheckReports = async () => {
  const sql = `SELECT MIN(r.id) AS report_id, r.created_at, r.created_by, r.note AS note_report,
      e.name AS employee_name, COUNT(*) AS total_products
      FROM stock_check_reports r
      JOIN employees e ON r.created_by = e.id
      GROUP BY r.created_at, r.created_by, r.note
      ORDER BY r.created_at DESC;
  `;
  const [rows] = await db.query(sql);
  return rows;
};

export const getStockCheckReportsDetail = async (created_time, created_by) => {
  const date = new Date(created_time);
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const mysqlDateTime = vnDate.toISOString().slice(0, 19).replace("T", " ");
  const sql = `
    SELECT r.*, p.name AS product_name 
    FROM stock_check_reports r
    JOIN products p ON r.product_id = p.id
    WHERE DATE_FORMAT(r.created_at, '%Y-%m-%d %H:%i:%s') = ? AND r.created_by = ?
  `;
  const [rows] = await db.query(sql, [mysqlDateTime, created_by]);
  return rows;
};

export const getAllImportSlips = async () => {
  const sql = `SELECT islip.id, islip.note, islip.created_at, islip.total_price, s.name AS supplier_name, e.name AS employee_name 
              FROM import_slips islip 
              LEFT JOIN suppliers s ON s.id = islip.suppliers_id
              JOIN employees e ON e.id = islip.created_by`;
  const [import_slips] = await db.query(sql);
  return import_slips;
};
