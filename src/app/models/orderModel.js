import db from "../lib/db";

export const getAllOrders = async () => {
  const [rows] = await db.query(
    `SELECT o.*, c.name AS customer_name
     FROM orders o
     JOIN customer c ON o.customer_id = c.id
     ORDER BY o.order_date DESC`
  );
  return rows;
};

export const getOrderById = async (id) => {
  const [orders] = await db.query(
    `SELECT o.*, c.name AS customer_name, p.payment_method FROM orders o
    JOIN customer c ON o.customer_id = c.id
    JOIN payments p ON o.id = p.order_id WHERE o.id = ?
    ORDER BY o.order_date DESC`,
    [id]
  );
  const [items] =
    await db.query(`SELECT oi.*, p.price, p.name AS product_name, p.image_url, s.name AS supplier_name, c.name AS category_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    JOIN suppliers s ON p.supplier_id = s.id
    JOIN categories c ON p.category_id = c.id`);
  const orderMap = orders.map((order) => {
    return {
      ...order,
      items: items.filter((item) => item.order_id === order.id),
    };
  });
  return orderMap;
};

export const createOrder = async (customer_id, items, userId, paid_amount) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      `INSERT INTO orders (customer_id, total_price, paid_amount) VALUES (?, 0, ?)`,
      [customer_id, paid_amount]
    );
    const orderId = result.insertId;
    const [customer] = await conn.query(
      `SELECT name AS customer_name FROM customer WHERE id = ?`,
      [customer_id]
    );
    const customerName = customer[0]?.customer_name || "Khách không xác định";
    let total = 0;
    for (const item of items) {
      const [inventory] = await conn.query(
        `SELECT * FROM inventory WHERE product_id = ?`,
        [item.product_id]
      );
      if (!inventory[0]) {
        throw new Error(
          `Không tìm thấy tồn kho cho sản phẩm ID ${item.product_id}`
        );
      }
      const oldQuantity = inventory[0].quantity;
      const updatedQuantity = oldQuantity - item.quantity;
      if (oldQuantity < item.quantity) {
        throw new Error(
          `Sản phẩm ID ${item.product_id} không đủ hàng trong kho.`
        );
      }
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
      await conn.query(
        `UPDATE inventory SET quantity = ? WHERE product_id = ?`,
        [updatedQuantity, item.product_id]
      );
      await conn.query(
        `UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?`,
        [item.quantity, item.product_id]
      );
      await conn.query(
        `INSERT INTO inventory_logs (product_id, type, quantity, note, created_by) VALUES (?, 'export', ?, ?, ?)`,
        [
          item.product_id,
          item.quantity,
          `Xuất kho: ${item.quantity} (từ ${oldQuantity} → ${updatedQuantity}) cho đơn hàng của khách ${customerName}`,
          userId,
        ]
      );
      total += item.quantity * item.price;
    }
    await conn.query(`UPDATE orders SET total_price = ? WHERE id = ?`, [
      total,
      orderId,
    ]);
    await conn.commit();
    return { order_id: orderId, total_price: total };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const updateOrderStatus = async (id, status) => {
  await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
  return { message: "Cập nhật trạng thái thành công!" };
};

// Hàm xoá đơn hàng cập nhật sau nha sếp (chắc qua lễ) :(
export const deleteOrder = async (id) => {};

export const updateDebtByOrderId = async (amount, id) => {
  await db.query(
    `UPDATE orders SET paid_amount = paid_amount + ? 
    WHERE id = ?`,
    [amount, id]
  );
  return { message: "Cập nhật công nợ khách hàng thành công!" };
};

export const searchOrder = async ({ searchTerm = "", orderDate = "" }) => {
  const likeQuery = `%${searchTerm}%`;
  let query = `SELECT o.*, c.name AS customer_name
     FROM orders o
     JOIN customer c ON o.customer_id = c.id
     WHERE 1=1`;
  const params = [];
  if (searchTerm) {
    query += ` AND (c.name LIKE ? OR o.id LIKE ?)`;
    params.push(likeQuery, likeQuery);
  }
  if (orderDate) {
    query += ` AND DATE(o.order_date) = ?`;
    params.push(orderDate);
  }
  query += ` ORDER BY o.order_date DESC`;
  const [orders] = await db.query(query, params);
  return orders;
};
