import {
  getImportSlipItems,
  getPaymentsByTransactionId,
  getTransactionById,
} from "@/app/models/debtModel";
import { createSupplierPayment } from "@/app/models/supplierPaymentModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const transaction = await getTransactionById(id);
    if (!transaction) {
      return NextResponse.json({ message: "Không tìm thấy công nợ" });
    }
    const items = await getImportSlipItems(transaction.import_slip_id);
    const payments = await getPaymentsByTransactionId(id);
    return NextResponse.json({ ...transaction, items, payments });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi máy chủ!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const body = await req.json();
  const { amount } = body;
  const { id } = await params;
  try {
    await createSupplierPayment(id, amount, "Thanh toán đơn hàng");
    return NextResponse.json(
      { message: "Cập nhật thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
