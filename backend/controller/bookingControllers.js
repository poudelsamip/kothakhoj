import Booking from "../models/Booking.js";
import Place from "../models/Place.js";

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
    const bookingDoc = await Booking.create({
      user: userId,
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
    });
    res.json(bookingDoc);
  } catch (error) {
    res.status(500).json({ message: "Create Booking Failed" });
  }
};

export const getUserBookings = async (req, res) => {
  const userId = req.user.id;
  res.json(await Booking.find({ user: userId }).populate("place"));
};

export const getBooking = async (req, res) => {
  const userId = req.user.id;
  const id = req.params;
  const placeData = await Booking.findOne({
    user: userId,
    _id: id,
  }).populate("place");
  res.json(placeData);
};

export const getBookedListings = async (req, res) => {
  const userId = req.user.id;
  const userPlaces = await Place.find({ owner: userId });
  const userPlacesIds = userPlaces.map((place) => place._id);
  const bookings = await Booking.find({
    place: { $in: userPlacesIds },
  })
    .populate("place")
    .populate("user")
    .sort({ checkIn: 1 });
  res.json(bookings);
};
