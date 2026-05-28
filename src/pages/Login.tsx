import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDetails, login } from "../service/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        return;
      }

      localStorage.setItem("ACCESS_TOKEN", accessToken);

      if (refreshToken) {
        localStorage.setItem("REFRESH", refreshToken);
      }

      await getMyDetails(); // no unused variable anymore

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
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Login;