import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }

    if (!isValidUrl(resumeUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    if (!resumeUrl) {
      setError("Resume link is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "http://localhost:5000/api/application",
        { jobId, resumeUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Application submitted successfully");

      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr,360px]">

        {/* LEFT: Context */}
        <div>
          <h1 className="text-3xl font-bold">Apply for this job</h1>
          <p className="text-base-content/60 mt-2 max-w-[60ch]">
            You are applying as <span className="font-medium">{user?.name}</span>.
            Make sure your resume link is accessible.
          </p>
        </div>

        {/* RIGHT: Apply Card */}
        <aside>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Resume URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://drive.google.com/..."
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
              />
              <p className="text-xs text-base-content/60 mt-1">
                Make sure sharing access is enabled
              </p>
            </div>

            {error && (
              <div className="text-sm text-error bg-error/10 p-2 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-success bg-success/10 p-2 rounded-md">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn w-full sm:w-auto px-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
                ${loading
                  ? "btn-disabled"
                  : "btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                }
              `}
            >
              {loading ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        </aside>

      </section>
    </main>
  );
};

export default ApplyJob;
