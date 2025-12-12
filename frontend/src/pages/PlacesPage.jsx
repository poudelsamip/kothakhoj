import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const handleDelete = async (id) => {
    await axios.delete(`/delete/${id}`);
    setRunUseEffect((prev) => !prev);
  };

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, [runUseEffect]);

  return (
    <div className="min-h-screen">
      <AccountNav />

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-2 bg-primary text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>

        {places.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {/* No listings yet. <br />
              Your listings will be visible here. */}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 mt-2">
            {places.map((place) => (
              <div
                key={place._id}
                to={`/place/${place._id}`}
                className="group relative flex gap-6 bg-white rounded-2xl p-6 shadow-md hover:bg-gray-100  transition-all duration-300 border border-gray-100"
              >
                <div className="shrink-0 w-48 h-36 rounded-xl overflow-hidden">
                  <Image
                    place={place}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 transition-colors">
                    {place.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
                    {place.description}
                  </p>
                  <Link
                    to={`/place/${place._id}`}
                    className="mt-4 inline-flex items-center font-medium text-md underline text-blue-600 gap-1 transition-all"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="grid gap-2 absolute top-4 right-4">
                  <Link
                    to={`/account/places/${place._id}`}
                    className="flex items-center bg-white gap-1  p-2 rounded-full shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(place._id)}
                    className="flex items-center bg-white gap-1  p-2 rounded-full shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
