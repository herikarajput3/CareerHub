import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// we don't need error state because user can't fix error by changing input. this is just fetching data so we remove it. 
const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyApplications = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/application/my");
                setApplications(res.data.applications);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyApplications();
    }, []);

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <p className="text-base-content/60">Loading your applications…</p>
            </main>
        );
    }

    if (applications.length === 0) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-semibold">
                    You haven’t applied to any jobs yet
                </h2>
                <p className="text-base-content/60 mt-2">
                    Start exploring jobs and apply to the ones that match your skills.
                </p>
                <Link
                    to="/jobs"
                    className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50 mt-6"
                >
                    Browse Jobs
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Applications</h1>
                <p className="text-base-content/60 mt-1">
                    You have applied to {applications.length} job
                    {applications.length > 1 && "s"}
                </p>
            </div>

            {/* Applications list */}
            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app._id}
                        className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        {/* Left */}
                        <div>
                            <h2 className="text-lg font-semibold">
                                {app.jobId?.title}
                            </h2>
                            <p className="text-sm text-base-content/60 mt-1">
                                {app.jobId?.location} • {app.jobId?.jobType}
                            </p>
                            <p className="text-xs text-base-content/50 mt-2">
                                Applied on{" "}
                                {new Date(app.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
                ${app.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : app.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {app.status.toUpperCase()}
                            </span>

                            <Link
                                to={`/jobs/${app.jobId?._id}`}
                                className="text-sm underline text-orange-600 hover:text-orange-700"
                            >
                                View Job
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default MyApplications;