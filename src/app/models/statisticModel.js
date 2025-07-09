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
                        JOIN products p ON i.product_id = p.id WHERE p.isDeleted = FALSE;`;
  const customerDebtSQL = `SELECT SUM(o.remaining_amount) AS customer_debt FROM orders o
                        WHERE o.remaining_amount > 0;`;
  const supplierDebtSQL = `SELECT SUM(remaining_amount) AS supplier_debt FROM supplier_transactions
                        WHERE remaining_amount > 0;`;
  const [revenueOverview] = await db.query(revenueSQL);
  const [totalInventory] = await db.query(totalInventorySQL);
  const [customerDebt] = await db.query(customerDebtSQL);
  const [supplierDebt] = await db.query(supplierDebtSQL);
  return {
    ...revenueOverview[0],
    ...totalInventory[0],
    ...customerDebt[0],
    ...supplierDebt[0],
  };
};

export const getOverviewRevenueByMonth = async () => {
  const statisticSQL = `SELECT MONTH(o.order_date) AS month, SUM(o.paid_amount) AS total_amount 
                    FROM orders o GROUP BY MONTH(o.order_date);`;
  const [statistic] = await db.query(statisticSQL);
  return { ...statistic };
};
