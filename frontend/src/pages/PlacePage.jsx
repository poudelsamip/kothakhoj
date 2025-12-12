import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (!place) return "loading...";

  return (
    <div className="mt-4  px-8 py-4 bg-gray-100 rounded-2xl">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <AddressLink place={place} />
      <PlaceGallery place={place} />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-[2fr_1fr] py-8">
        <div>
          <div>
            <h2 className="font-semibold text-2xl">Description</h2>
            <p className="leading-5 text-justify">{place.description}</p>
          </div>
          <div className="mt-4">
            Check-in : {place.checkIn} <br />
            Check-out : {place.checkOut} <br />
            Maximum guests : {place.maxGuests}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="-mx-8 px-8 py-4 border-t border-gray-300">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mt-1 text-sm text-justify text-gray-800 leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
