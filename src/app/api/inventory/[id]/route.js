import { checkAuth } from "@/app/middleware/authMiddleware";
import { create, getById, update } from "@/app/models/inventoryModel";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const item = await getById(id);
    if (!item) return NextResponse.json({ message: "Không tìm thấy kho!" });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi lấy chi tiết kho!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = req.json();
    const auth = await checkAuth();
    if (!auth.ok) {
      return NextResponse.json({ message: auth.message, status: auth.status });
    }
    const userId = auth.user.id;
    await update(id, body, userId);
    return NextResponse.json(
      { message: "Cập nhật thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi cập nhật kho!",
        error: message.error,
      },
      { status: 500 }
    );
  }
}
