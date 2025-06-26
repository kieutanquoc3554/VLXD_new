import db from "../lib/db";

export const getAllCustomers = async () => {
  try {
    const sql = `SELECT * FROM customer`;
    const [customers] = await db.query(sql);
    return customers;
  } catch (error) {
    console.log("Có lỗi xảy ra" + error);
  }
};

export const createCustomer = async (name, phone, email, address) => {
  try {
    const sql =
      "INSERT INTO customer (name, phone, email, address) VALUES (?, ?, ?, ?)";
    await db.query(sql, [name, phone, email, address]);
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id, name, phone, email, address) => {
  try {
    const sql =
      "UPDATE customer SET name=?, phone=?, email=?, address=? WHERE id=?";
    const [result] = await db.query(sql, [name, phone, email, address, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const sql = "UPDATE customer SET deleted = TRUE WHERE id=?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

export const getCustomerById = async (id) => {
  try {
    const sql = "SELECT * FROM customer WHERE id=?";
    const [customer] = await db.query(sql, [id]);
    return customer[0];
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};

export const restoreCustomer = async (id) => {
  try {
    const sql = "UPDATE customer SET deleted = FALSE WHERE id=?";
    await db.query(sql, [id]);
  } catch (error) {
    throw error;
  }
};

export const searchCustomer = async (value) => {
  const query = `%${value}%`;
  try {
    const sql = "SELECT * FROM customer WHERE customer.name LIKE ?";
    const [customer] = await db.query(sql, [query]);
    return customer;
  } catch (error) {
    console.log("Có lỗi xảy ra!" + error);
  }
};
