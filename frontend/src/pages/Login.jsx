import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

       if (res.data.role === "clinic_pending") {
      navigate("/clinic-request");
      return;
    }

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "clinic") navigate("/clinic");
      else navigate("/owner");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (BRAND PANEL) */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white p-10">

        <h1 className="text-3xl font-bold mb-4">🐾 Pet Clinic System</h1>

        <p className="text-center text-sm opacity-90">
          Connect pet owners with clinics to manage health, vaccines,
          diseases and treatments in one platform.
        </p>

        <div className="mt-10 bg-white/20 p-6 rounded-xl backdrop-blur">
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-sm mt-2">
            Manage pets smarter and faster with our system.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Login
          </h2>

          <input
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            LOGIN
          </button>

           <button
    onClick={() => navigate("/register")}
    className="w-full mt-3 border border-blue-500 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold"
  >
    CREATE ACCOUNT
  </button>


          <p className="text-xs text-center mt-4 text-gray-400">
            © Pet Clinic System
          </p>

        </div>

      </div>
    </div>
  );
}