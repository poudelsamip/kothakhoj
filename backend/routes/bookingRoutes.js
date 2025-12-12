import express from "express";
import {
  createBooking,
  getUserBookings,
  getBooking,
  getBookedListings,
} from "../controller/bookingControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bookings", requireAuth, createBooking);
router.get("/bookins", requireAuth, getUserBookings);
router.get("/bookings/:id", requireAuth, getBooking);
router.get("/bookedlistings", requireAuth, getBookedListings);

export default router;
