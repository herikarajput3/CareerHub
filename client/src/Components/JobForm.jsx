import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'
import { useEffect, useState } from 'react';
import axios from 'axios';

const JobForm = ({ mode = "create", jobId }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        jobType: "",
        salary: "",
        experience: "",
        jobLevel: "",
        skillsRequired: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ---------------- EDIT MODE: PREFILL ---------------- */

    useEffect(() => {
        if (mode === "edit" && jobId) {
            const fetchJob = async () => {
                try {
                    setLoading(true);
                    const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);

                    const job = res.data.job;

                    setFormData({
                        title: job.title || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        salary: job.salary || "",
                        experience: job.experience || "",
                        jobLevel: job.jobLevel || "",
                        skillsRequired: job.skillsRequired?.join(", ") || "",
                        description: job.description || "",
                    });
                } catch (error) {
                    console.error(error);
                    setError("Failed to load job");
                } finally {
                    setLoading(false);
                }
            };
            fetchJob();
        }
    }, [mode, jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const url = mode === "edit"
                ? `http://localhost:5000/api/jobs/${jobId}`
                : "http://localhost:5000/api/jobs";

            const request = mode === "edit" ? axios.put : axios.post;

            await request(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/myjobs");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm space-y-6"
        >
            <div>
                <h2 className="text-lg font-semibold mb-3">
                    Basic Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />

                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Job Type</option>
                        <option value="full time">Full-time</option>
                        <option value="part time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                        <option value="freelance">Freelance</option>

                    </select>

                    <select
                        name="jobLevel"
                        value={formData.jobLevel}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="">Job Level</option>
                        <option value="junior level">Junior</option>
                        <option value="mid level">Mid</option>
                        <option value="senior level">Senior</option>

                    </select>
                </div>
            </div>

            {/* DETAILS */}
            <div>
                <h2 className="text-lg font-semibold mb-3">
                    Job Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary (e.g. 20,000$)"
                        value={formData.salary}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        name="experience"
                        placeholder="Experience (e.g. 2–4 years)"
                        value={formData.experience}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <input
                    type="text"
                    name="skillsRequired"
                    placeholder="Skills (comma separated)"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-4"
                />

                <textarea
                    name="description"
                    placeholder="Describe the role, responsibilities, and expectations"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mt-4"
                    rows={5}
                    required
                />
            </div>

            {error && (
                <div className="text-sm text-error bg-error/10 p-2 rounded-md">
                    {error}
                </div>
            )}

            {/* ACTION */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`btn w-full sm:w-auto px-8
              ${loading
                            ? "btn-disabled"
                            : "btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                        }`}
                >
                    {loading
                        ? "Saving..."
                        : mode === "edit"
                            ? "Save Changes"
                            : "Post Job"}
                </button>
            </div>
        </form>
    );
};
export default JobForm