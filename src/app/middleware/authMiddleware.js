import jwt from "jsonwebtoken";
import { getSessionByToken } from "@/app/models/employeeModel";

export async function checkAuth(req, res) {
  const token = req.cookies?.token;
  if (!token) {
    return { ok: false, status: 401, message: "Bạn chưa đăng nhập!" };
  }
  try {
    const session = await getSessionByToken(token);
    if (!session) {
      return {
        ok: false,
        status: 403,
        message: "Session hết hạn hoặc không hợp lệ!",
        token,
      };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { ok: true, user: decoded };
  } catch (error) {
    return { ok: false, status: 403, message: "Token không hợp lệ!" };
  }
}
