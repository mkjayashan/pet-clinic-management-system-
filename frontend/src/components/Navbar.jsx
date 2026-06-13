import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const role = localStorage.getItem("role");

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-2">
        <div className="text-2xl">🐾</div>
        <h1 className="font-bold text-blue-600 text-lg">
          Pet Clinic System
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search questions, clinics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* PROFILE ICON */}
        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
          {role ? role.charAt(0).toUpperCase() : "U"}
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
}