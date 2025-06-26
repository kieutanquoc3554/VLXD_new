import db from "../lib/db";

exports.getAllSuppliers = async () => {
  const [suppliers] = await db.query(`SELECT * FROM suppliers`);
  return suppliers;
};

exports.getSupplierById = async (id) => {
  const [supplier] = await db.query(`SELECT * FROM suppliers WHERE id=?`, [id]);
  return supplier[0];
};

exports.createSupplier = async (name, phone, email, address) => {
  await db.query(
    `INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)`,
    [name, phone, email, address]
  );
};

exports.updateSupplier = async (id, name, phone, email, address) => {
  const [result] = await db.query(
    `UPDATE suppliers SET name=?, phone=?, email=?, address=? WHERE id=?`,
    [name, phone, email, address, id]
  );
  return result.affectedRows > 0;
};

exports.deleteSupplier = async (id) => {
  const [result] = await db.query(
    `UPDATE suppliers SET deleted = TRUE WHERE id=?`,
    [id]
  );
  return result.affectedRows > 0;
};

exports.restoreSupplier = async (id) => {
  const [result] = await db.query(
    `UPDATE suppliers SET deleted = FALSE WHERE id=?`,
    [id]
  );
  return result.affectedRows > 0;
};
