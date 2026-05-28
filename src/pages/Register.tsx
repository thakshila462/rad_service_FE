import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../service/auth";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conPassword, setConPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !conPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== conPassword) {
      alert("Password and confirm password should be same");
      return;
    }

    setLoading(true);

    try {
      const data = await register(name, email, password);

      console.log(data);

      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </div>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;