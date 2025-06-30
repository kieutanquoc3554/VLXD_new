const path = require("path");
const os = require("os");
import cloudinary from "@/app/lib/cloudinary";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");
  const buffer = Buffer.from(await file.arrayBuffer());
  const tempFilePath = path.join(os.tmpdir(), file.name);
  await fs.promises.writeFile(tempFilePath, buffer);
  try {
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "uploads",
    });
    await fs.promises.unlink(tempFilePath);
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
