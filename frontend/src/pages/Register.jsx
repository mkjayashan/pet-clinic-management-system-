import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate(); // ✅ FIXED (inside component)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "owner",
  });

  const register = async () => {
    try {
      await api.post("/register", data);
      alert("Registered Successfully");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-6">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join Pet Clinic System 🐾
        </p>

        <div className="space-y-4">

          <input
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Full Name"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email Address"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <select
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setData({ ...data, role: e.target.value })
            }
          >
            <option value="owner">Pet Owner</option>
            <option value="clinic">Clinic</option>
          </select>

          <button
            onClick={register}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition shadow-lg"
          >
            Register
          </button>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => navigate("/")}  // ✅ WORKS NOW
            className="w-full text-blue-600 font-semibold hover:underline"
          >
            Already have an account? Login
          </button>

        </div>

      </div>

    </div>
  );
}