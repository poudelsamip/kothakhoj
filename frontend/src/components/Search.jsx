import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchPlace = async (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  return (
    <form
      onSubmit={searchPlace}
      className="flex items-center gap-2 border border-gray-300 rounded-full px-4"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Address"
        className="my-1! py-0! border-none! outline-0 text-lg"
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="size-7 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
