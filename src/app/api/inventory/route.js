import { checkAuth } from "@/app/middleware/authMiddleware";
import { create, getAllInventory } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAllInventory();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi khi lấy danh sách kho hàng!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const auth = await checkAuth();
    if (!auth.ok) {
      return NextResponse.json({ message: auth.message, status: auth.status });
    }
    const userId = auth.user.id;
    const result = await create(body, userId);
    return NextResponse.json({
      message: "Nhập kho thành công",
      import_slip_id: result.importSlipId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi nhập kho", error: error.message },
      { status: 500 }
    );
  }
}
