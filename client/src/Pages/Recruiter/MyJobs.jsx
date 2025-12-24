import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyJobs = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loadingJobId, setLoadingJobId] = useState(null);


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

    const toggleJobStatus = async (jobId, currentStatus) => {
        try {
            setLoadingJobId(jobId);
            await axios.put(
                `http://localhost:5000/api/jobs/${jobId}/status`,
                { isOpen: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            setJobs((prev) =>
                prev.map((job) =>
                    job._id === jobId
                        ? { ...job, isOpen: !currentStatus }
                        : job
                )
            );

            toast.success(
                !currentStatus ? "Job opened successfully" : "Job closed successfully"
            );

        } catch (error) {
            console.error(error);
            toast.error("Failed to update job status");

        }
    }

    const handleDeleteJob = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/jobs/${jobToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setJobs((prev) =>
                prev.filter((job) => job._id !== jobToDelete)
            );

            setJobToDelete(null);
        } catch (err) {
            console.error("Failed to delete job", err);
        }
    };


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
        <main className=" max-w-5xl mx-auto px-4 py-10">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Posted Jobs</h1>
                <p className="text-base-content/60 mt-1">
                    {jobs.length} jobs • {openJobs} currently open
                </p>
            </div>

            {/* JOB LIST */}
            <div className=" space-y-4">
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
                        <div className="flex flex-col items-end gap-3 min-w-60">

                            {/* STATUS */}
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
      ${job.isOpen
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {job.isOpen ? "OPEN" : "CLOSED"}
                            </span>

                            {/* PRIMARY ACTION */}
                            <button
                                onClick={() => navigate(`/myjobs/${job._id}/applicants`)}
                                className="btn btn-sm btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                            >
                                View Applicants
                            </button>

                            {/* SECONDARY ACTIONS */}
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={!job.isOpen}
                                    onClick={() => navigate(`/myjobs/${job._id}/edit`)}
                                    className="btn btn-xs btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => toggleJobStatus(job._id, job.isOpen)}
                                    className="btn btn-xs btn-outline border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    {job.isOpen ? "Close" : "Open"}
                                </button>

                                <button
                                    disabled={!job.isOpen}
                                    onClick={() => setJobToDelete(job._id)}
                                    className="btn btn-xs btn-ghost text-gray-400 hover:text-red-500"
                                    title="Delete Job"
                                >
                                    🗑
                                </button>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
            {jobToDelete && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="bg-base-100 rounded-xl p-6 w-full max-w-sm shadow-lg">
                        <h3 className="text-lg font-semibold">
                            Delete Job?
                        </h3>
                        <p className="text-sm text-base-content/60 mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                autoFocus
                                onClick={() => setJobToDelete(null)}
                                className="btn btn-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteJob}
                                className="btn btn-sm btn-outline border-red-500 text-red-600 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default MyJobs;