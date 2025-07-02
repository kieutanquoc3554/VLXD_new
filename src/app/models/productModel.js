import db from "../lib/db";

export const updateImage = async (productId, imageUrl) => {
  const sql = "UPDATE products SET image_url = ? WHERE id = ?";
  const [result] = await db.query(sql, [imageUrl, productId]);
  return result;
};

export const getAllProducts = async () => {
  const sql =
    "SELECT p.id, p.name, p.import_price, p.price, p.stock_quantity, p.unit, p.description, p.image_url, p.disabled, p.isDeleted, c.name AS category_name, s.name AS supplier_name FROM products p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN suppliers s ON p.supplier_id = s.id";
  const [rows] = await db.query(sql);
  return rows;
};

export const createProduct = async (product) => {
  const sql =
    "INSERT INTO products (name, category_id, supplier_id, price, import_price, stock_quantity, unit, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    product.name,
    product.category_id || null,
    product.supplier_id || null,
    product.price,
    product.import_price,
    product.stock_quantity || 0,
    product.unit,
    product.description || null,
    product.image_url || null,
  ];
  const [result] = await db.query(sql, params);
  return result;
};

export const findProductByName = async (name) => {
  const sql = "SELECT price, stock_quantity, unit FROM products WHERE name = ?";
  const [rows] = await db.query(sql, [name]);
  return rows[0];
};

export const getProductById = async (id) => {
  const sql = `SELECT * FROM products WHERE id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

export const updateProductFields = async (id, fields) => {
  const sql = "UPDATE products SET ? WHERE id = ?";
  const [result] = await db.query(sql, [fields, id]);
  return result;
};

export const updateProduct = async (id, product, userId) => {
  const sql = "UPDATE products SET ? WHERE id = ?";
  const [result] = await db.query(sql, [product, id]);
  const sqlInventory = `SELECT * FROM inventory WHERE product_id = ?`;
  const [rows] = await db.query(sqlInventory, [id]);
  const oldQuantity = rows[0].quantity;
  const newQuantity = product.stock_quantity;
  const diffQuantity = newQuantity - oldQuantity;
  if (diffQuantity !== 0) {
    const sqlUpdateQuantityInventory = `UPDATE inventory SET quantity = ? WHERE product_id = ?`;
    await db.query(sqlUpdateQuantityInventory, [product.stock_quantity, id]);
    const sqlUpdateInventoryLogs = `INSERT INTO inventory_logs (product_id, type, quantity, note, created_by) VALUES (?, 'adjustment', ?, ?, ?)`;
    await db.query(sqlUpdateInventoryLogs, [
      id,
      diffQuantity,
      `Điều chỉnh số lượng từ ${rows[0].quantity} → ${product.stock_quantity}`,
      userId,
    ]);
  }
  return result;
};

export const updateStockQuantity = async (product_id, quantity) => {
  await db.query(`UPDATE products SET stock_quantity = ? WHERE id = ?`, [
    quantity,
    product_id,
  ]);
};

export const decreaseStockQuantity = async (product_id, quantity) => {
  await db.query(
    `UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?`,
    [quantity, product_id]
  );
};

export const restoreProduct = async (product_id) => {
  await db.query(`UPDATE products SET isDeleted = 0 WHERE id = ?`, [
    product_id,
  ]);
};

export const searchProduct = async (value) => {
  const query = `%${value}%`;
  const [products] = await db.query(
    `SELECT p.id, p.name, p.import_price, p.price, p.stock_quantity, 
    p.unit, p.description, p.image_url, p.disabled, p.isDeleted, 
    c.name AS category_name, s.name AS supplier_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    LEFT JOIN suppliers s ON p.supplier_id = s.id WHERE p.name LIKE ?`,
    [query]
  );
  return products;
};

export const filterProduct = async (id) => {
  const [products] = await db.query(
    `SELECT p.id, p.name, p.import_price, p.price, p.stock_quantity, 
    p.unit, p.description, p.image_url, p.disabled, p.isDeleted, 
    c.name AS category_name, s.name AS supplier_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    LEFT JOIN suppliers s ON p.supplier_id = s.id WHERE p.category_id = ?`,
    [id]
  );
  return products;
};
