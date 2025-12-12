import { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos)
    return (
      <div className="absolute inset-0 text-white min-h-screen ">
        <div className="py-8 px-64 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-28">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed border border-gray-500 right-12 top-8 flex gap-2 p-2 bg-white text-black rounded-full shadow-md shadow-black "
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img
                  className="w-full"
                  src={`http://localhost:3000/uploads/${photo}`}
                />
              </div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                src={`http://localhost:3000/uploads/${place.photos[0]}`}
                className="aspect-square object-cover w-full cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="grid grid-rows-2">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              src={`http://localhost:3000/uploads/${place.photos[1]}`}
              className="aspect-square object-cover w-full cursor-pointer"
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={`http://localhost:3000/uploads/${place.photos[2]}`}
                className="aspect-square object-cover w-full cursor-pointer relative top-2"
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setShowAllPhotos(true);
        }}
        className="flex gap-1 absolute bottom-2 right-2 px-2 py-1 bg-white rounded-2xl border border-gray-600 shadow-sm shadow-gray-600"
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
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Show All Photos
      </button>
    </div>
  );
};

export default PlaceGallery;
