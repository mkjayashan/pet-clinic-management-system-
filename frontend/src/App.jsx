import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ClinicDashboard from "./pages/ClinicDashboard.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import ClinicRequest from "./pages/ClinicRequest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/clinic" element={<ClinicDashboard />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/clinic-request" element={<ClinicRequest />} />
    </Routes>
  );
}