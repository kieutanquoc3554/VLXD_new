import { updateProduct } from "@/app/models/productModel";
import { checkAuth } from "@/app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const product = body;
    const auth = await checkAuth();
    if (!auth.ok) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    const userId = auth.user.id;
    const response = await updateProduct(id, product, userId);
    return NextResponse.json({
      message: "Cập nhật sản phẩm thành công!",
      response,
      id: id,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
