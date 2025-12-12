import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Search from "./Search";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="mt-16 px-4 py-4 flex justify-between border-t border-t-gray-300">
        <Link to={"/"} href="" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="logo font-bold text-2xl">Kotha Khoj</span>
        </Link>

        <div>Find best place to stay</div>
      </div>
      <div className="text-center">© 2025 Kotha Khoj. All rights reserved</div>
    </div>
  );
};

export default Footer;
