import db from "../lib/db";

export const getAllSuppliers = async () => {
  const [suppliers] = await db.query(`SELECT * FROM suppliers`);
  return suppliers;
};

export const getSupplierById = async (id) => {
  const [supplier] = await db.query(`SELECT * FROM suppliers WHERE id=?`, [id]);
  return supplier[0];
};

export const createSupplier = async (name, phone, email, address) => {
  await db.query(
    `INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)`,
    [name, phone, email, address]
  );
};

export const updateSupplier = async (id, name, phone, email, address) => {
  const [result] = await db.query(
    `UPDATE suppliers SET name=?, phone=?, email=?, address=? WHERE id=?`,
    [name, phone, email, address, id]
  );
  return result.affectedRows > 0;
};

export const deleteSupplier = async (id) => {
  const [result] = await db.query(
    `UPDATE suppliers SET deleted = TRUE WHERE id=?`,
    [id]
  );
  return result.affectedRows > 0;
};

export const restoreSupplier = async (id) => {
  const [result] = await db.query(
    `UPDATE suppliers SET deleted = FALSE WHERE id=?`,
    [id]
  );
  return result.affectedRows > 0;
};

export const searchSupplier = async (value) => {
  const query = `%${value}%`;
  const [supplier] = await db.query(
    `SELECT * FROM suppliers s WHERE s.name LIKE ?`,
    [query]
  );
  return supplier;
};
