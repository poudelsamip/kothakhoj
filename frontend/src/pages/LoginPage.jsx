import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter Credentials");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
    setLoading(false);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={`primary ${loading ? "cursor-not-allowed!" : ""}`}>
            {!loading ? "Login" : "logging in ..."}
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account ?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register Now
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
