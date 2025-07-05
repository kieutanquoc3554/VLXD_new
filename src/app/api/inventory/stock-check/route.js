import { checkAuth } from "@/app/middleware/authMiddleware";
import { createStockCheck } from "@/app/models/inventoryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const auth = await checkAuth();
    const body = await req.json();
    const checks = body;
    if (!auth.ok) {
      return NextResponse.json({ message: auth.message, status: auth.status });
    }
    const userId = auth.user.id;
    await createStockCheck(checks, userId);
    return NextResponse.json(
      { message: "Lập báo cáo kiểm kho thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi lập kiểm kho!", error: error.message },
      { status: 500 }
    );
  }
}
