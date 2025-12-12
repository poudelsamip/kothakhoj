import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, []);

  const inputHeaderDesc = (title, desc) => {
    return (
      <>
        <h2 className="text-xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{desc}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      //here we are editing our listed place
      await axios.put("/places/", { id, ...placeData });
    } else {
      // add new place to db
      await axios.post("/places", placeData);
    }
    setRedirect(true);
  };

  if (redirect) return <Navigate to={"/account/places"} />;

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {inputHeaderDesc(
          "Title",
          "Title for your place. Should be short and catchy"
        )}
        <input
          type="text"
          placeholder="title eg. My Lovely Appartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {inputHeaderDesc("Address", "Format : Location,Municipality,District")}
        <input
          type="text"
          placeholder="Hakimchowk, Bharatpur, Chitwan"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {inputHeaderDesc("Photos", "Try to include many images")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {inputHeaderDesc("Description", "Describe your place")}
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* //perks */}
        {inputHeaderDesc("Perks", "Selects all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />

        {inputHeaderDesc("Extra Info", "House rules, etc")}
        <textarea
          rows={2}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {inputHeaderDesc(
          "Check In & Check Out Times, Max Guests",
          "Add check in, check out time and Remeber to have some time window"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time : </h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time : </h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maximum Guests: </h3>
            <input
              type="number"
              placeholder="max guests"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night: </h3>
            <input
              type="number"
              placeholder="Rs. 1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
