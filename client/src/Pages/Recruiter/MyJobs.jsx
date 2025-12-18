import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const MyJobs = () => {
    const { token } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/jobs/myJobs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJobs(res.data.jobs || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load jobs");
            }
            finally {
                setLoading(false);
            }
        };
        fetchMyJobs();
    }, [token]);


    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-error">{error}</p>;
    if (!jobs.length) return <p className="p-4">You have not posted any jobs yet.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">My Posted Jobs</h1>
            {/* yaha tum apna JobCard reuse kar sakti ho, bas data recruiter wale API se aayega */}
            {jobs.map((job) => (
                <div key={job._id} className="mb-3 border p-3 rounded-lg">
                    {job.title}
                </div>
            ))}
        </div>
    );
};

export default MyJobs;
