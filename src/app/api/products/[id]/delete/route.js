import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { updateProduct, updateProductFields } from "@/app/models/productModel";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const [productRow] = await db.query(
      "SELECT isDeleted FROM products WHERE id = ?",
      [id]
    );
    const product = productRow[0];
    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm!" },
        { status: 404 }
      );
    }
    if (product.isDeleted === 1) {
      return NextResponse.json(
        { message: "Sản phẩm đã được xoá!" },
        { status: 400 }
      );
    }
    await updateProductFields(id, { isDeleted: 1 });
    return NextResponse.json(
      { message: "Đã xoá sản phẩm thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
