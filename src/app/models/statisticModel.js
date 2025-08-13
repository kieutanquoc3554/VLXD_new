import db from "../lib/db";

export const getOverviewStatistic = async () => {
  // 1. Doanh thu tổng thể
  const revenueTotalSQL = `
    SELECT 
      SUM(total_price) AS total_revenue,
      SUM(paid_amount) AS actual_revenue
    FROM orders
    WHERE status = 'Completed';
  `;

  // 2. Giá vốn thực tế đã trả
  const revenueDetailSQL = `
    SELECT 
      SUM((oi.quantity * p.import_price) *
        CASE 
          WHEN o.total_price = 0 THEN 0
          ELSE o.paid_amount / o.total_price
        END
      ) AS actual_cost
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.status = 'Completed';
  `;

  const totalInventorySQL = `
    SELECT SUM(i.quantity * p.import_price) AS total_inventory
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE p.isDeleted = FALSE;
  `;

  const customerDebtSQL = `
    SELECT SUM(remaining_amount) AS customer_debt
    FROM orders
    WHERE remaining_amount > 0;
  `;

  const supplierDebtSQL = `
    SELECT SUM(remaining_amount) AS supplier_debt
    FROM supplier_transactions
    WHERE remaining_amount > 0;
  `;

  const [[revenueTotal]] = await db.query(revenueTotalSQL);
  const [[revenueDetail]] = await db.query(revenueDetailSQL);
  const [[totalInventory]] = await db.query(totalInventorySQL);
  const [[customerDebt]] = await db.query(customerDebtSQL);
  const [[supplierDebt]] = await db.query(supplierDebtSQL);

  const actual_revenue = revenueTotal.actual_revenue || 0;
  const actual_cost = revenueDetail.actual_cost || 0;

  return {
    total_revenue: revenueTotal.total_revenue || 0,
    actual_revenue,
    actual_cost,
    profit: actual_revenue - actual_cost,
    ...totalInventory,
    ...customerDebt,
    ...supplierDebt,
  };
};

export const getOverviewRevenueByDate = async (startDate, endDate) => {
  // Doanh thu theo đơn và doanh thu thực nhận
  const revenueTotalSQL = `SELECT SUM(total_price) AS total_revenue,
                              SUM(paid_amount) AS actual_revenue
                        FROM orders
                        WHERE status = 'Completed' AND order_date BETWEEN ? AND ?`;
  // Giá vốn thực tế theo tiền khách trả
  const revenueDetailSQL = `SELECT SUM((oi.quantity * p.import_price) * 
                              CASE
                                WHEN o.total_price = 0 THEN 0
                                ELSE o.paid_amount / o.total_price
                              END) AS actual_cost
                            FROM orders o
                            JOIN order_items oi ON oi.order_id = o.id
                            JOIN products p ON p.id = oi.product_id
                            WHERE o.status = 'Completed' AND o.order_date BETWEEN ? AND ?`;
  // Tính giá trị tồn kho
  const totalInventorySQL = `SELECT SUM(i.quantity * import_price) AS total_inventory
                             FROM inventory i
                             JOIN products p ON i.product_id = p.id
                             WHERE p.isDeleted = FALSE AND i.last_updated BETWEEN ? AND ?`;
  // Tính giá trị công nợ của khách hàng
  const customerDebtSQL = `SELECT SUM(o.remaining_amount) AS customer_debt
                           FROM orders o
                           WHERE o.remaining_amount > 0 AND o.order_date BETWEEN ? AND ?`;
  // Tính giá trị công nợ của nhà cung cấp
  const supplierDebtSQL = `SELECT SUM(remaining_amount) AS supplier_debt
                           FROM supplier_transactions
                           WHERE remaining_amount > 0 AND created_at BETWEEN ? AND ?`;
  // Truy vaans
  const [[revenueTotal]] = await db.query(revenueTotalSQL, [
    startDate,
    endDate,
  ]);
  const [[revenueDetail]] = await db.query(revenueDetailSQL, [
    startDate,
    endDate,
  ]);
  const [[totalInventory]] = await db.query(totalInventorySQL, [
    startDate,
    endDate,
  ]);
  const [[customerDebt]] = await db.query(customerDebtSQL, [
    startDate,
    endDate,
  ]);
  const [[supplierDebt]] = await db.query(supplierDebtSQL, [
    startDate,
    endDate,
  ]);

  // TÍnh lợi nhuận thực
  const actual_revenue = revenueTotal.actual_revenue || 0;
  const actual_cost = revenueDetail.actual_cost || 0;

  return {
    total_revenue: revenueTotal.total_revenue || 0,
    actual_revenue,
    actual_cost,
    profit: actual_revenue - actual_cost,
    ...totalInventory,
    ...customerDebt,
    ...supplierDebt,
  };
};

export const getOverviewRevenueByMonth = async () => {
  const statisticSQL = `SELECT MONTH(o.order_date) AS month, SUM(o.paid_amount) AS total_amount 
                    FROM orders o GROUP BY MONTH(o.order_date);`;
  const [statistic] = await db.query(statisticSQL);
  return { ...statistic };
};

export const getBestSellingProduct = async () => {
  const statisticSQL = `SELECT p.image_url AS image, p.name, SUM(oi.quantity) AS quantitySold, SUM(oi.price * oi.quantity) AS revenue
                        FROM order_items oi
                        JOIN orders o ON o.id = oi.order_id
                        JOIN products p ON oi.product_id = p.id
                        WHERE o.status = "Completed" AND o.remaining_amount = 0
                        GROUP BY oi.product_id
                        ORDER BY revenue DESC
                        LIMIT 5;`;
  const lessSellingProduct = `SELECT p.id, p.name, p.image_url AS image, COALESCE(SUM(oi.quantity), 0) AS quantitySold, COALESCE(SUM(oi.quantity * oi.price), 0) AS revenue
                        FROM products p
                        LEFT JOIN order_items oi ON oi.product_id = p.id
                        LEFT JOIN orders o ON o.id = oi.order_id AND o.status = 'Completed' AND o.remaining_amount = 0
                        WHERE p.disabled = FALSE AND p.isDeleted = FALSE
                        GROUP BY p.id
                        HAVING quantitySold <= 5 OR revenue < 1000000
                        ORDER BY quantitySold ASC;`;
  const [statistic] = await db.query(statisticSQL);
  const [lessProduct] = await db.query(lessSellingProduct);
  return { bestSelling: statistic, lessSelling: lessProduct };
};
