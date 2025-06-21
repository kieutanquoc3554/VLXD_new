import cloudinary from "@/lib/cloudinary";
import IncomingForm from "formidable/Formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sai phương thức" });
  }
  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir: "./public/uploads",
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    const file = files.image;
    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "uploads",
      });
      fs.unlinkSync(file.filepath);
      return res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });
}
