import { checkAuth } from "@/app/middleware/authMiddleware";
import { getProductById } from "@/app/models/inventoryModel";
import { createOrder, getAllOrders } from "@/app/models/orderModel";
import { createPayment } from "@/app/models/paymentModel";
import { decreaseStockQuantity } from "@/app/models/productModel";
import { createTransaction } from "@/app/models/transactionModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await getAllOrders();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const auth = await checkAuth();
  const body = await req.json();
  const { customer_id, items, payment_method, paid_amount } = body;
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message, status: auth.status });
  }
  const userId = auth.user.id;
  try {
    let enrichedItems = [];
    let total = 0;
    for (const item of items) {
      const product = await getProductById(item.product_id);
      if (!product) {
        return NextResponse.json(
          { message: "Không tìm thấy sản phẩm!" },
          { status: 404 }
        );
      }
      if (product.quantity < item.quantity) {
        return NextResponse.json(
          {
            message: `Sản phẩm ${product.name} chỉ còn ${product.quantity} sản phẩm trong kho`,
          },
          { status: 400 }
        );
      }
      const price = product.price;
      const subtotal = item.quantity * price;
      total += subtotal;
      enrichedItems.push({ ...item, price });
    }
    const { order_id } = await createOrder(
      customer_id,
      enrichedItems,
      userId,
      paid_amount
    );
    for (const item of enrichedItems) {
      await createTransaction({
        product_id: item.product_id,
        transaction_type: "Export",
        quantity: item.quantity,
        employee_id: userId,
      });
      await decreaseStockQuantity(item.product_id, item.quantity);
    }
    if (payment_method) {
      await createPayment(order_id, payment_method, paid_amount);
    }
    return NextResponse.json({ message: "Tạo đơn hàng thành công!", order_id });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi thêm đơn hàng!",
        message: message.error,
      },
      { status: 500 }
    );
  }
}
