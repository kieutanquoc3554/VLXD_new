import { searchCustomer } from "@/app/models/customerModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { message: "Thiếu từ khoá tìm kiếm" },
      { status: 400 }
    );
  }
  try {
    const results = await searchCustomer(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tìm kiếm khách hàng" },
      { status: 500 }
    );
  }
}
