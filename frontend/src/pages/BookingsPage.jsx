import { useEffect } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useState } from "react";
import Image from "../components/Image";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <AccountNav />
      <div className="max-w-6xl mx-auto px-4">
        {bookings?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No bookings yet. <br />
              Your Bookings will be visible here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 mt-4">
            {bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="group flex gap-6 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 border border-gray-200 hover:bg-gray-100"
              >
                <div className="shrink-0 w-48 rounded-xl overflow-hidden">
                  <Image
                    place={booking.place}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 transition-colors">
                      {booking.place.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-gray-700">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                          />
                        </svg>
                        <span className="font-semibold">
                          {differenceInCalendarDays(
                            new Date(booking.checkOut),
                            new Date(booking.checkIn)
                          )}{" "}
                          nights
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <span className="font-medium">
                        {format(new Date(booking.checkIn), "MMM dd, yyyy")}
                      </span>
                      <span className="text-gray-400">→</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <span className="font-medium">
                        {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {booking.price}.00
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
