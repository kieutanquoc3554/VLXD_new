import { searchBill } from "@/models/billModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query)
    return NextResponse.json(
      { error: "Thiếu từ khóa tìm kiếm" },
      { status: 400 }
    );

  try {
    const results = await searchBill(query);
    return NextResponse.json(results);
  } catch (err) {
    console.error("Lỗi tìm kiếm phiếu thanh toán:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tìm kiếm phiếu thanh toán" },
      { status: 500 }
    );
  }
}
