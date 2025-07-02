import { restoreProduct } from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  try {
    await restoreProduct(id);
    return NextResponse.json(
      { message: "Khôi phục thành công!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
