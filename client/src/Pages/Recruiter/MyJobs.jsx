import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ---------------- FETCH RECRUITER JOBS ----------------
    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await axios.get(
                    "http://localhost:5000/api/jobs/myJobs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setJobs(res.data.jobs || []);
            } catch (err) {
                console.error(err);
                setError(
                    err.response?.data?.message || "Failed to load jobs"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyJobs();
    }, [token]);

    // ---------------- UI STATES ----------------
    if (loading) {
        return <p className="p-6 text-center">Loading your jobs...</p>;
    }

    if (error) {
        return (
            <p className="p-6 text-center text-error">
                {error}
            </p>
        );
    }

    if (!jobs.length) {
        return (
            <p className="p-6 text-center">
                You have not posted any jobs yet.
            </p>
        );
    }

    // ---------------- MAIN UI ----------------
    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                My Posted Jobs
            </h1>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border border-base-200 rounded-lg p-4 bg-base-100"
                    >
                        {/* JOB TITLE */}
                        <h2 className="text-lg font-semibold">
                            {job.title}
                        </h2>

                        {/* JOB META */}
                        <p className="text-sm text-base-content/70">
                            {job.location} • {job.jobType}
                        </p>

                        {/* STATUS */}
                        <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
                ${job.isOpen
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {job.isOpen ? "OPEN" : "CLOSED"}
                        </span>

                        {/* ACTIONS */}
                        <div className="mt-4">
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={() =>
                                    navigate(
                                        `/myjobs/${job._id}/applicants`
                                    )
                                }
                            >
                                View Applicants
                            </button>
                        </div>

                        {/*
              ❌ Beginner mistake:
              - Fetching applicants here
              - Mixing dashboard & detail logic

              ✅ Correct:
              - Navigate to Applicants page
              - Let that page fetch data
            */}
                    </div>
                ))}
            </div>
        </main>
    );
};

export default MyJobs;
