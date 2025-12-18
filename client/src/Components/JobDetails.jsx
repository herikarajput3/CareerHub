import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobDetailsSkeleton from "./JobDetailsSkeleton";
import { useAuth } from "../Context/AuthContext";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(false);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    let applyAction = null;

    if (!job) {
        applyAction = null
    } else if (!job.isOpen) {
        applyAction = "closed";
    } else if (!user) {
        applyAction = "login";
    } else if (user.role !== "candidate") {
        applyAction = "hidden";
    } else if (hasApplied) {
        applyAction = "applied";
    } else {
        applyAction = "apply";
    }


    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleApply = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!job) return;

        navigate(`/apply/${job._id}`);
    }


    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (!user || user.role !== 'candidate' || !job?._id) return;

            try {
                setCheckingApplication(true);
                const res = await axios.get(
                    `http://localhost:5000/api/application/check/${job._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHasApplied(res.data.applied);
                console.log("has applied:", res.data.applied);

            } catch (error) {
                console.error("Error checking application status:", error);
            } finally {
                setCheckingApplication(false);
            }
        };
        checkApplicationStatus();
    }, [user, job, token]);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);

                setJob(res.data.job);
            } catch (error) {
                console.error(error);
                setError("Failed to load job");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id])
    if (loading) return <JobDetailsSkeleton />;

    if (error) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-semibold text-error">
                    Something went wrong
                </h2>
                <p className="text-sm text-base-content/60 mt-2">
                    Unable to load job details. Please try again later.
                </p>
            </main>
        );
    }

    if (!job) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-semibold">
                    Job not found
                </h2>
                <p className="text-sm text-base-content/60 mt-2">
                    This job may have been removed or closed.
                </p>
            </main>
        );
    }


    return (
        <>
            <main className='max-w-5xl mx-auto px-4 py-10'>
                <section className='grid gap-6 lg:grid-cols-[1fr,320px] lg:items-start'>
                    <div>

                        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight">{job.title}</h1>

                        <p className="text-sm text-base-content/70 mt-1">{job.recruiter?.companyName}</p>

                        <dl className="mt-4 text-sm text-base-content/60 flex flex-wrap gap-2">
                            <div>
                                <dt className="sr-only">Location</dt>
                                <dd>{job.location}</dd>
                            </div>
                            <span className="text-base-content/40">•</span>

                            <div><dt className="sr-only">Experience</dt><dd>{job.experience}</dd></div>

                            <span className="text-base-content/40">•</span>

                            <div><dt className="sr-only">Salary</dt><dd>{job.salary}</dd></div>

                        </dl>

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <span className="text-sm font-medium mr-1">Skills:</span>
                            <div className="flex flex-wrap gap-2">
                                {job.skillsRequired?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">{skill}</span>
                                ))}

                            </div>
                        </div>


                        <p className="max-w-[70ch] text-base leading-relaxed mt-6 sm:text-lg">{job.description}</p>

                        <hr className="my-5 border-t border-base-200" />

                        <div className="mt-4 text-sm text-base-content/60">
                            Posted: {formatDate(job.createdAt)} •{" "}
                            <span className="underline cursor-pointer">Share</span>
                        </div>

                    </div>

                    <aside className="lg:sticky lg:top-20">

                        <div className="rounded-xl border border-base-200 bg-base-100 p-4 sm:p-5 shadow-sm">

                            <div className="text-sm text-base-content/70">Type</div>
                            <div className="text-xl font-medium mt-1">{job.jobType}</div>

                            <div className="mt-4">
                                <div className="text-sm text-base-content/70">Salary</div>
                                <div className="text-base font-medium mt-1">{job.salary}</div>
                            </div>

                            {applyAction === "closed" && (
                                <button className="btn w-full sm:w-auto mt-6" disabled>
                                    Job Closed
                                </button>
                            )}


                            {applyAction === "login" && (
                                <button
                                    className="btn w-full sm:w-auto mt-6 btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                                    onClick={() => navigate("/login")}
                                >
                                    Login to Apply
                                </button>
                            )}

                            {applyAction === "applied" && (
                                <button className="btn w-full sm:w-auto mt-6 btn-success" disabled>
                                    Already Applied
                                </button>
                            )}
                            {applyAction === "apply" && (
                                <button
                                    className="btn w-full sm:w-auto mt-6 btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
                                    onClick={handleApply}
                                >
                                    Apply Now
                                </button>
                            )}


                        </div>
                    </aside>
                </section>
            </main >
        </>
    )
}

export default JobDetails