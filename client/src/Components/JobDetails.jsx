import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                console.log(res.data.job);
                setJob(res.data.job);
            } catch (error) {
                setError("Failed to load job");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!job) return <p>Job not found</p>;

    console.log(job);
    return (
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
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">React</span>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">Tailwind</span>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">Node</span>
                        </div>
                    </div>


                    <p className="max-w-[70ch] text-base leading-relaxed mt-6 sm:text-lg">description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti doloribus nesciunt aliquid quaerat temporibus saepe sit, quos, sunt amet quis rem voluptatibus reiciendis dolores veritatis? Repudiandae enim eos libero non.</p>

                    <hr className="my-8 border-t border-base-200" />

                    <div className="mt-4 text-sm text-base-content/60">
                        Posted: 01 Dec 2025 • <span className="underline cursor-pointer">Share</span>
                    </div>

                </div>

                <aside className="lg:sticky lg:top-20">

                    <div className="rounded-xl border border-base-200 bg-base-100 p-4 sm:p-5 shadow-sm">

                        <div className="text-sm text-base-content/70">Type</div>
                        <div className="text-xl font-medium mt-1">Full Time</div>

                        <div className="mt-4">
                            <div className="text-sm text-base-content/70">Salary</div>
                            <div className="text-base font-medium mt-1">20,000</div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50 w-full mt-6 sm:w-auto px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                            aria-label="Apply for this job"
                        >Apply Now</button>

                    </div>
                </aside>
            </section>
        </main>
    )
}

export default JobDetails