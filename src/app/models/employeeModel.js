import db from "../lib/db";

export const getAllEmployees = async () => {
  const sql = `SELECT * FROM employees`;
  const [employees] = await db.query(sql);
  return employees;
};

export const createEmployee = async (
  name,
  role,
  phone,
  email,
  passwordHash
) => {
  const sql = `INSERT INTO employees (name, role, phone, email, password_hash) VALUES (?, ?, ?, ?, ?)`;
  await db.query(sql, [name, role, phone, email, passwordHash]);
};

export const getEmployeeByEmail = async (email) => {
  const sql = `SELECT * FROM employees WHERE email = ?`;
  const [row] = await db.query(sql, [email]);
  return row[0];
};

export const getEmployeeByPhone = async (phone) => {
  const sql = `SELECT * FROM employees WHERE phone = ?`;
  const [row] = await db.query(sql, [phone]);
  return row[0];
};

export const getEmployeeByToken = async (token) => {
  if (!token) throw new Error("Token không hợp lệ!");
  const sql = `SELECT DISTINCT e.id, e.name, e.role, e.phone, e.email FROM employees e JOIN user_sessions u ON e.id = u.employee_id WHERE u.token = ? LIMIT 1`;
  const [row] = await db.query(sql, [token]);
  return row.length === 0 ? null : row[0];
};

export const createSession = async (employeeId, token, expiresAt) => {
  const sql = `INSERT INTO user_sessions (employee_id, token, expires_at) VALUES (?, ?, ?)`;
  return db.query(sql, [employeeId, token, expiresAt]);
};

export const getSessionByToken = async (token) => {
  const sql = `SELECT * FROM user_sessions WHERE token = ?`;
  const [row] = await db.query(sql, [token]);
  return row[0];
};

export const deleteSession = async (token) => {
  const sql = `DELETE FROM user_sessions WHERE token = ?`;
  await db.query(sql, [token]);
};

export const updateEmployee = async (id, name, role, phone, email) => {
  const sql = `UPDATE employees SET name=?, role=?, phone=?, email=? WHERE id=?`;
  const [result] = await db.query(sql, [name, role, phone, email, id]);
  return result.affectedRows > 0;
};

export const suspendEmployee = async (id, suspendedUntil, permanently) => {
  const sql = `UPDATE employees SET suspended_permanently = ?, suspended_until = ? WHERE id = ?`;
  await db.query(sql, [permanently, suspendedUntil, id]);
  return { message: "Nhân viên đã bị đình chỉ" };
};

export const deleteEmployee = async (id) => {
  const sql = `UPDATE employees SET deleted = TRUE WHERE id=?`;
  await db.query(sql, [id]);
  return { message: "Đã xóa nhân viên" };
};

export const restoreEmployee = async (id) => {
  const sql = `UPDATE employees SET deleted = FALSE WHERE id=?`;
  await db.query(sql, [id]);
  return { message: "Đã khôi phục nhân viên" };
};
