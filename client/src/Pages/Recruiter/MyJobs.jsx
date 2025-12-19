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
                setError(
                    err.response?.data?.message || "Failed to load your jobs"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyJobs();
    }, [token]);

    /* ---------------- UI STATES ---------------- */

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <p className="text-base-content/60">
                    Loading your posted jobs…
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

    if (!jobs.length) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-semibold">
                    You haven’t posted any jobs yet
                </h2>
                <p className="text-base-content/60 mt-2">
                    Start by posting your first job to receive applications.
                </p>
                <button
                    onClick={() => navigate("/postjob")}
                    className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50 mt-6"
                >
                    Post a Job
                </button>
            </main>
        );
    }

    /* ---------------- MAIN UI ---------------- */

    const openJobs = jobs.filter((j) => j.isOpen).length;

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Posted Jobs</h1>
                <p className="text-base-content/60 mt-1">
                    {jobs.length} jobs • {openJobs} currently open
                </p>
            </div>

            {/* JOB LIST */}
            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        {/* LEFT */}
                        <div>
                            <h2 className="text-lg font-semibold">
                                {job.title}
                            </h2>
                            <p className="text-sm text-base-content/60 mt-1">
                                {job.location} • {job.jobType}
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
                ${job.isOpen
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {job.isOpen ? "OPEN" : "CLOSED"}
                            </span>

                            <button
                                onClick={() =>
                                    navigate(`/myjobs/${job._id}/applicants`)
                                }
                                className="btn btn-sm btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                            >
                                View Applicants
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default MyJobs;