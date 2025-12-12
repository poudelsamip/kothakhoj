import { useState } from "react";
import AllPlaces from "../components/AllPlaces";
import { useEffect } from "react";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return <AllPlaces places={places} />;
};

export default IndexPage;
