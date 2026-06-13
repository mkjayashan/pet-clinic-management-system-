import { useState } from "react";
import api from "../api/api";

export default function ClinicRequest() {

  const [data, setData] = useState({
    clinic_name: "",
    email: "",
    phone: "",
    address: ""
  });

  const submitRequest = async () => {
    try {
      await api.post("/clinic-request", data);
      alert("Request sent to Admin for approval");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          🏥 Clinic Registration Request
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Clinic Name"
            onChange={(e) =>
              setData({ ...data, clinic_name: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Phone"
            onChange={(e) =>
              setData({ ...data, phone: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Address"
            onChange={(e) =>
              setData({ ...data, address: e.target.value })
            }
          />

          <button
            onClick={submitRequest}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Send Request
          </button>

        </div>

      </div>

    </div>
  );
}