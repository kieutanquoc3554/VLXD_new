import { searchDebts } from "@/app/models/debtModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { message: "Thiếu từ khoá tìm kiếm!" },
      { status: 400 }
    );
  }
  try {
    const result = await searchDebts(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Lỗi máy chủ khi tìm kiếm công nợ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
