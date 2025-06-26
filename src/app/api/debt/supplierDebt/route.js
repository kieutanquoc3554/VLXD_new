import { getSupplierDebts } from "@/app/models/debtModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const supplierDebts = await getSupplierDebts();
    return NextResponse.json(supplierDebts);
  } catch (error) {
    return NextResponse.json(
      { message: "Có lỗi xảy ra!", error: error.message },
      { status: 500 }
    );
  }
}
