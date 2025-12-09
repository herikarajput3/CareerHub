/* eslint-disable react/prop-types */
const JobCard = ({ job }) => {
    return (
        <article className="card rounded-xl border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-base-100">
            <div className="card-body p-4 sm:p-5">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap gap-3">
                    <h2 className="card-title text-base sm:text-lg">{job.title}</h2>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <div className="badge badge-primary">{job.jobType}</div>
                        <div className="badge badge-outline border-primary text-primary">{job.jobLevel}</div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center text-xs sm:text-sm text-base-content/70 gap-1 mt-2">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                    <span>•</span>
                    <span>{job.salary}</span>
                </div>

                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-base-content/70">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">Skills:</span>
                        <div className="flex flex-wrap gap-1">
                            {job.skillsRequired.map((skill) => (
                                <span
                                    key={skill}
                                    className="badge badge-ghost badge-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <span className="font-medium">
                        Posted:{" "}
                        <span className="font-normal">{job.postedAt}</span>
                    </span>
                    
                </div>
                <div className="card-actions mt-4 justify-end">
                    <button className="btn btn-sm btn-outline">
                        View Details
                    </button>
                </div>
            </div>
        </article>
    );
};

export default JobCard;
