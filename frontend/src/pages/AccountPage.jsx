import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    setLoading(true);
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
    setLoading(false);
  };

  if (!ready) return "loading...";

  if (ready && !user && !redirect) return <Navigate to="/login" />;

  if (redirect) return <Navigate to={"/"} />;

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg min-h-screen mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={logout}
            className={`primary max-w-sm mt-2 ${
              loading ? "cursor-not-allowed!" : ""
            }`}
          >
            {!loading ? "Logout" : "logging out ..."}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
