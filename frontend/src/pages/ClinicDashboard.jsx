import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

export default function ClinicDashboard() {

  const [clinic, setClinic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Answer modal state
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Clinic request modal state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    clinic_name: "",
    address: "",
    phone: ""
  });
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  // ✅ Only show questions that don't have an answer yet
  const pendingQuestions = questions.filter((q) => !q.answer);

  const loadClinic = async () => {
    try {
      const res = await api.get("/my-clinic");
      setClinic(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ OPEN REQUEST MODAL
  const openRequestModal = () => {
    setRequestForm({ clinic_name: "", address: "", phone: "" });
    setShowRequestModal(true);
  };

  // ✅ CLOSE REQUEST MODAL
  const closeRequestModal = () => {
    setShowRequestModal(false);
    setRequestForm({ clinic_name: "", address: "", phone: "" });
  };

  // ✅ HANDLE FORM INPUT CHANGE
  const handleRequestChange = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value
    });
  };

  // ✅ SEND REQUEST
  const sendRequest = async () => {
    if (!requestForm.clinic_name.trim() || !requestForm.address.trim() || !requestForm.phone.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setRequestSubmitting(true);

    try {
      await api.post("/clinic-request", {
        clinic_name: requestForm.clinic_name,
        address: requestForm.address,
        phone: requestForm.phone
      });

      alert("Request sent to admin");
      closeRequestModal();
      loadClinic();
    } catch (err) {
      console.log(err);
      alert("Failed to send request");
    } finally {
      setRequestSubmitting(false);
    }
  };

  // ✅ OPEN ANSWER MODAL
  const openAnswerModal = (question) => {
    setActiveQuestion(question);
    setAnswerText("");
    setShowAnswerModal(true);
  };

  // ✅ CLOSE ANSWER MODAL
  const closeAnswerModal = () => {
    setShowAnswerModal(false);
    setActiveQuestion(null);
    setAnswerText("");
  };

  // ✅ SUBMIT ANSWER
  const submitAnswer = async () => {
    if (!answerText.trim()) {
      alert("Please type an answer before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/answer", {
        question_id: activeQuestion.id,
        answer: answerText
      });

      closeAnswerModal();
      loadQuestions();
    } catch (err) {
      console.log(err);
      alert("Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    loadClinic();
    loadQuestions();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h1 className="text-3xl font-bold text-green-600">
            🏥 Clinic Dashboard
          </h1>
        </div>

        {loading ? (
          <div className="bg-white p-6 rounded-2xl text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (!clinic || clinic.status === "none") ? (

          /* 🟢 NO CLINIC YET */
          <div className="bg-white p-6 rounded-2xl text-center">

            <h2 className="text-xl font-bold">
              No clinic registered
            </h2>

            <p className="text-gray-500 mb-4">
              Send request to admin to register your clinic
            </p>

            <button
              onClick={openRequestModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Send Request
            </button>

          </div>

        ) : clinic.status === "pending" ? (

          /* 🟡 PENDING */
          <div className="bg-yellow-50 p-6 rounded-2xl text-center">
            <h2 className="font-bold text-yellow-600">
              Pending Approval
            </h2>
            <p className="text-gray-500 mt-2">
              Your clinic request is waiting for admin approval.
            </p>
          </div>

        ) : clinic.status === "approved" ? (

          /* ✅ APPROVED */
          <div>

            <h2 className="font-bold text-green-600 mb-4">
              Approved Clinic ✔
            </h2>

            {pendingQuestions.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center text-gray-500">
                🎉 No pending questions. All caught up!
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-400"
                  >

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold">{q.title}</h3>

                      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                        ⏳ Pending
                      </span>
                    </div>

                    <p className="mt-1">{q.description}</p>

                    <button
                      onClick={() => openAnswerModal(q)}
                      className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Answer
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

        ) : (

          /* ❌ REJECTED */
          <div className="bg-red-50 p-6 rounded-2xl text-center">
            <h2 className="font-bold text-red-600">
              Request Rejected
            </h2>
            {clinic.message && (
              <p className="text-gray-500 mt-2">{clinic.message}</p>
            )}
            <button
              onClick={openRequestModal}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Send Request Again
            </button>
          </div>

        )}

        {/* 🟦 CLINIC REQUEST MODAL */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">

              <h2 className="text-lg font-bold mb-1">
                Register Your Clinic
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Fill in the details below to send a request to the admin.
              </p>

              <div className="space-y-3">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    name="clinic_name"
                    value={requestForm.clinic_name}
                    onChange={handleRequestChange}
                    placeholder="e.g. Sunrise Pet Clinic"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={requestForm.address}
                    onChange={handleRequestChange}
                    placeholder="e.g. 123 Main Street, Colombo"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telephone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={requestForm.phone}
                    onChange={handleRequestChange}
                    placeholder="e.g. 0771234567"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={closeRequestModal}
                  disabled={requestSubmitting}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={sendRequest}
                  disabled={requestSubmitting}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {requestSubmitting ? "Sending..." : "Send Request"}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 🟦 ANSWER MODAL */}
        {showAnswerModal && activeQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">

              <h2 className="text-lg font-bold mb-1">
                Answer Question
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {activeQuestion.title}
              </p>

              <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-700">
                {activeQuestion.description}
              </div>

              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Type your answer here..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={closeAnswerModal}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Answer"}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}