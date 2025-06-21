const db = require("../utils/db");

exports.getAllCategories = async () => {
  const [categories] =
    await db.query(`SELECT c.id, c.name, c.description, c.created_at, c.disabled,
        c.deleted, COUNT(p.id) AS product_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        GROUP BY c.id
        ORDER BY c.id ASC;
`);
  return categories;
};

exports.getCategoryById = async (id) => {
  const [category] = await db.query(`SELECT * FROM categories WHERE id=?`, [
    id,
  ]);
  return category[0];
};

exports.createCategory = async (name, description) => {
  await db.query(`INSERT INTO categories (name, description) VALUES (?, ?)`, [
    name,
    description,
  ]);
};

exports.updateCategory = async (id, name, description, disabled, deleted) => {
  await db.query(
    "UPDATE categories SET name=?, description=?, disabled=?, deleted=? WHERE id=?",
    [name, description, disabled, deleted, id]
  );
};

exports.deleteCategory = async (id) => {
  await db.query("DELETE FROM categories WHERE id=?", [id]);
};
