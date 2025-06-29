import { searchSupplier } from "@/app/models/supplierModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  try {
    if (!query) {
      return NextResponse.json(
        { message: "Thiếu từ khoá tìm kiếm" },
        { status: 400 }
      );
    }
    const response = await searchSupplier(query);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
