import express from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controller/authControllers.js";
import { getUserData } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getUserData, profile);
router.post("/logout", logout);

export default router;
