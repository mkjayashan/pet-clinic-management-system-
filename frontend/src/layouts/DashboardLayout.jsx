import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-64 bg-white shadow-lg p-5 min-h-screen">

          <h1 className="text-xl font-bold text-blue-600 mb-6">
            Dashboard
          </h1>

          {role === "admin" && (
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/admin">
              🛠 Admin Panel
            </Link>
          )}

          {role === "clinic" && (
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/clinic">
              🏥 Clinic Panel
            </Link>
          )}

          {role === "owner" && (
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/owner">
              🐶 Owner Panel
            </Link>
          )}

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">
          {children}
        </div>

      </div>
    </div>
  );
}