import { Link } from "react-router-dom";

const AllPlaces = ({ places }) => {
  return (
    <div className="mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id} className="group">
            <div className="overflow-hidden rounded-2xl bg-gray-100 mb-3 transition-all duration-300 ">
              {place.photos[0] && (
                <>
                  <img
                    className="w-full h-52 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      place.photos?.[0]
                    }`}
                    alt={place.title}
                  />
                </>
              )}
            </div>

            <div className="px-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {place.title}
                </h3>
              </div>

              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="text-sm truncate">{place.address}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-md font-bold">Rs.{place.price}</span>
                <span className="text-sm text-gray-600">/ night</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AllPlaces;
