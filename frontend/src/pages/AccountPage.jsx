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
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
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
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
