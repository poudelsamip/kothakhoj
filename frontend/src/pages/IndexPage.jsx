import { useState } from "react";
import AllPlaces from "../components/AllPlaces";
import { useEffect } from "react";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
      setLoading(false)
    });
  }, []);
  return <AllPlaces places={places} loading={loading}/>;
};

export default IndexPage;
