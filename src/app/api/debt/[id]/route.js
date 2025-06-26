import { getDebtsByOrderId } from "@/app/models/debtModel";
import { updateDebtByOrderId } from "@/app/models/orderModel";
import { createPayment } from "@/app/models/paymentModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const detailsDebt = await getDebtsByOrderId(id);
    return NextResponse.json(detailsDebt);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Không thể lấy chi tiết công nợ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { amount, payment_method = "Cash" } = body;
    if (!amount) {
      return NextResponse.json(
        { message: "Thiếu thông tin thanh toán!" },
        { status: 400 }
      );
    }
    const detailsDebt = await getDebtsByOrderId(id);
    if (amount > detailsDebt.remaining_amount) {
      return NextResponse.json({
        message: `Số tiền tối đa cần thanh toán là: ${detailsDebt.remaining_amount}. Số tiền bạn đang thanh là: ${amount}`,
      });
    }
    await updateDebtByOrderId(amount, id);
    await createPayment(id, payment_method, amount);
    return NextResponse.json(
      { message: "Cập nhật công nợ hoàn tất" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi cập nhật công nợ", error: error.message },
      { status: 500 }
    );
  }
}
