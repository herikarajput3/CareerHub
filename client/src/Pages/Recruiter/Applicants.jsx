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
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(`http://localhost:5000/api/application/job/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data);
                setApplications(res.data.applications);
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.message || "Failed to load applications");
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, [jobId]);

    // update Status

    const updateStatus = async (applicationId, status) => {
        try {
            setUpdatingId(applicationId);
            await axios.put("http://localhost:5000/api/applications/status",
                {
                    applicationId,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            /* Update UI without refetching entire list*/

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

    if (loading) {
        return <div className="p-10 text-center">Loading applicants...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-error">{error}</div>;
    }

    if (applications.length === 0) {
        return (
            <div className="p-10 text-center">
                No applicants yet for this job.
            </div>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Applicants</h1>

            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app._id}
                        className="border border-base-200 rounded-lg p-4 bg-base-100"
                    >
                        <h2 className="font-semibold">
                            {app.candidateId?.name}
                        </h2>

                        <p className="text-sm text-base-content/70">
                            {app.candidateId?.email}
                        </p>

                        <a
                            href={app.candidateId?.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 underline"
                        >
                            View Resume
                        </a>

                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-sm font-medium">
                                Status: {app.status}
                            </span>

                            <button
                                className="btn btn-success btn-sm"
                                disabled={
                                    updatingId === app._id || app.status === "accepted"
                                }
                                onClick={() =>
                                    updateStatus(app._id, "accepted")
                                }
                            >
                                Accept
                            </button>

                            <button
                                className="btn btn-error btn-sm"
                                disabled={
                                    updatingId === app._id || app.status === "rejected"
                                }
                                onClick={() =>
                                    updateStatus(app._id, "rejected")
                                }
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Applicants