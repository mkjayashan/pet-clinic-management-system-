import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AdminDashboard() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD CLINICS
  const loadClinics = async () => {
    try {
      const res = await api.get("/clinics");
      setClinics(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      window.location.href = "/login";
      return;
    }

    loadClinics();
  }, []);

  // APPROVE
  const approve = async (id) => {
    await api.put(`/approve/${id}`);
    loadClinics();
  };

  // REJECT
  const reject = async (id) => {
    await api.put(`/reject/${id}`);
    loadClinics();
  };

  // DELETE
  const remove = async (id) => {
    await api.delete(`/clinic/${id}`);
    loadClinics();
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen p-6">

        {/* HEADER */}
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border">
          <h1 className="text-3xl font-bold text-blue-600">
            🛠 Admin Dashboard
          </h1>
          <p className="text-gray-500">
            Manage clinic registration requests
          </p>
        </div>

        {/* CONTENT */}
        <div className="bg-white shadow-xl rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-4">
            🏥 Clinic Requests
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading clinics...</p>
          ) : clinics.length === 0 ? (
            <p className="text-gray-500">No clinic requests found</p>
          ) : (
            <div className="grid gap-4">

              {clinics.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
                >

                  {/* CLINIC INFO */}
                  <h3 className="text-lg font-bold text-gray-800">
                    {c.clinic_name}
                  </h3>

                  <p className="text-gray-600">{c.email}</p>
                  <p className="text-gray-600">{c.phone}</p>
                  <p className="text-gray-600">{c.address}</p>

                  {/* STATUS */}
                  <div className="mt-2">
                    <span
                      className={
                        c.status === "approved"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                          : c.status === "rejected"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs"
                      }
                    >
                      {c.status}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 flex gap-2">

                    <button
                      onClick={() => approve(c.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => reject(c.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => remove(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}