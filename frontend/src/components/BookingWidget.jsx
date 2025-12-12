import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";

const BookingWidget = ({ place }) => {
  const { user } = useContext(UserContext);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    if (!user) {
      alert("Please Login To Book This Place");
      return;
    }
    const { data } = await axios.post("/bookings", {
      name,
      phone,
      checkIn,
      checkOut,
      numberOfGuests,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="bg-white shadow-sm p-4 rounded-2xl mt-4 sm:mt-0">
      <div className="font-semibold text-md text-center">
        Price : Rs.{place.price} / per night
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4">
        <div className="flex">
          <div className="flex-1 py-2 px-4 border-r border-r-gray-200">
            <label>Check in : </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex-1 py-2 px-4">
            <label>Check out : </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-2 px-4 border-t border-gray-200">
          <label>Number of guests</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="py-2 px-4 border-t border-gray-200">
              <label>Your Full Name :</label>
              <input
                type="text"
                placeholder="Ram Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="py-2 px-4 border-t border-gray-200">
              <label>Phone Number :</label>
              <input
                type="tel"
                placeholder="+977 9845012345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4 font-semibold">
        Book This Place
        {numberOfNights > 0 && <span> Rs.{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
