import db from "@/app/lib/db";
import { updateProductFields } from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const [product] = await db.query(
      "SELECT disabled FROM products WHERE id = ?",
      [id]
    );
    const currentProduct = product[0];
    if (!currentProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    const newDisabledValue = currentProduct.disabled === 1 ? 0 : 1;
    await updateProductFields(id, { disabled: newDisabledValue });
    return NextResponse.json({
      message: newDisabledValue
        ? "Sản phẩm đã bị ẩn"
        : "Sản phẩm đã hiển thị lại",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
