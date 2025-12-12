import { getUserData } from "../utils/jwt.js";

export async function requireAuth(req, res, next) {
  try {
    const { token } = req.cookies || {};
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    req.user = await getUserData(token);
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}
