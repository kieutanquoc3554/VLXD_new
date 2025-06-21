// src/pages/api/ping.js
import pool from "@/lib/db";

export default async function handler(req, res) {
  try {
    const [row] = await pool.query('SELECT "Database Connected" AS message');
    res.status(200).json(row[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi kết nối database" });
  }
}
