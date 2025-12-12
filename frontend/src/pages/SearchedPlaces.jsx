import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AllPlaces from "../components/AllPlaces";

const SearchedPlaces = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const q = searchParams.get("q");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios.get(`/search?q=${q}`).then(({ data }) => {
      setSearchResult(data);
      setLoading(false);
    });
  }, [q]);
  return (
    <>
      {searchResult.length > 0 ? (
        <>
          <h1 className="mt-4 -mb-4 mx-2 text-lg">
            Search results for <span className="font-semibold">{q}</span>
          </h1>
          <AllPlaces places={searchResult} />
        </>
      ) : (
        <div className="min-h-screen">
          {loading ? (
            <h1 className="mt-16 mx-2 text-lg text-center text-gray-600">
              Loading
            </h1>
          ) : (
            <h1 className="mt-16 mx-2 text-lg text-center text-gray-600">
              No Results Found For <span className="font-semibold">{q}</span>
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default SearchedPlaces;
