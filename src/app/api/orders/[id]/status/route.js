import { updateOrderStatus } from "@/app/models/orderModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { status } = body;
    const { id } = params;
    const result = await updateOrderStatus(id, status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Không thể cập nhật trạng thái đơn hàng!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
