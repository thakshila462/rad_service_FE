import React from "react";
import { useNavigate } from "react-router-dom";
import { getMyDetails, login } from "../service/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const loginData = await login(email, password);

      const accessToken = loginData?.data?.accessToken;
      const refreshToken = loginData?.data?.refreshToken;

      if (!accessToken) {
        alert("Login failed: token not received");
        setLoading(false);
        return;
      }

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      if (refreshToken) {
        localStorage.setItem("REFRESH", refreshToken);
      }

      setToken(accessToken);

      const myRes = await getMyDetails();
      const userData = myRes?.data;

      alert("Login Success!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* {token && (
          <div className="mt-5 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            <b>Token:</b> {token}
          </div>
        )} */}

      </div>
    </div>
  );
};

export default Login;