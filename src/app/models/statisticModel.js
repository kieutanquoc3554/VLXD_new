import db from "../lib/db";

export const getOverviewStatistic = async () => {
  const revenueSQL = `SELECT SUM(oi.quantity * oi.price) AS total_revenue,
                        SUM((oi.price * oi.quantity) - (p.import_price * oi.quantity)) AS actual_revenue
                        FROM orders o
                        JOIN order_items oi ON oi.order_id = o.id
                        JOIN products p ON oi.product_id = p.id
                        WHERE o.status = "Completed";`;
  const totalInventorySQL = `SELECT SUM( i.quantity * p.import_price) AS total_inventory
                        FROM inventory i
                        JOIN products p ON i.product_id = p.id WHERE p.isDeleted = TRUE;`;
  const [revenueOverview] = await db.query(revenueSQL);
  const [totalInventory] = await db.query(totalInventorySQL);
  return { ...revenueOverview[0], ...totalInventory[0] };
};
