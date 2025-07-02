import { filterProduct } from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const result = await filterProduct(id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server!", error: error.message },
      { status: 500 }
    );
  }
}
