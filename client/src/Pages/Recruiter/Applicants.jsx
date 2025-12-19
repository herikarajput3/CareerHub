import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Applicants = () => {
  const { jobId } = useParams();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:5000/api/application/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data.applications);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load applicants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, token]);

  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      await axios.put(
        "http://localhost:5000/api/application/status",
        { applicationId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-base-content/60">
          Loading applicants…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-error">{error}</p>
      </main>
    );
  }

  if (applications.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">
          No applicants yet
        </h2>
        <p className="text-base-content/60 mt-2">
          Once candidates apply, they will appear here.
        </p>
      </main>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  const pendingCount = applications.filter(
    (a) => a.status === "pending"
  ).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Applicants</h1>
        <p className="text-base-content/60 mt-1">
          {applications.length} total • {pendingCount} pending
        </p>
      </div>

      {/* Applicant Cards */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* LEFT: Candidate Info */}
            <div>
              <h2 className="text-lg font-semibold">
                {app.candidateId?.name}
              </h2>
              <p className="text-sm text-base-content/60">
                {app.candidateId?.email}
              </p>

              <a
                href={app.candidateId?.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-orange-600 underline hover:text-orange-700 mt-2 inline-block"
              >
                View Resume
              </a>
            </div>

            {/* RIGHT: Status & Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  app.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status.toUpperCase()}
              </span>

              {app.status === "pending" && (
                <>
                  <button
                    disabled={updatingId === app._id}
                    onClick={() =>
                      updateStatus(app._id, "accepted")
                    }
                    className="btn btn-sm btn-outline border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Accept
                  </button>

                  <button
                    disabled={updatingId === app._id}
                    onClick={() =>
                      updateStatus(app._id, "rejected")
                    }
                    className="btn btn-sm btn-outline border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Applicants;