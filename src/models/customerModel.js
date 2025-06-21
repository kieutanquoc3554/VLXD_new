const db = require("../utils/db");

exports.getAllCustomers = async () => {
  try {
    const sql = `SELECT * FROM customer`;
    const [customers] = await db.query(sql);
    return customers;
  } catch (error) {
    console.log("Có lỗi xảy ra" + error);
  }
};

exports.createCustomer = async (name, phone, email, address) => {
  try {
    const sql =
      "INSERT INTO customer (name, phone, email, address) VALUES (?, ?, ?, ?)";
    await db.query(sql, [name, phone, email, address]);
  } catch (error) {
    throw error;
  }
};

exports.updateCustomer = async (id, name, phone, email, address) => {
  try {
    const sql =
      "UPDATE customer SET name=?, phone=?, email=?, address=? WHERE id=?";
    const [result] = await db.query(sql, [name, phone, email, address, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

exports.deleteCustomer = async (id) => {
  try {
    const sql = "UPDATE customer SET deleted = TRUE WHERE id=?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

exports.getCustomerById = async (id) => {
  try {
    const sql = "SELECT * FROM customer WHERE id=?";
    const [customer] = await db.query(sql, [id]);
    return customer[0];
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

exports.restoreCustomer = async (id) => {
  try {
    const sql = "UPDATE customer SET deleted = FALSE WHERE id=?";
    await db.query(sql, [id]);
  } catch (error) {
    throw error;
  }
};
