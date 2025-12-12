import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const bookingModel = mongoose.model("Booking", bookingSchema);
export default bookingModel;

// place, checkIn, checkOut, numberOfGuests, name, phone, price
