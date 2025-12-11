const JobCard = ({ job }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-In", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    }

    const timeAgo = (dateString) => {
        if (!dateString) return "";

        const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);

        const intervals = [
            { label: "year", secs: 31536000 },
            { label: "month", secs: 2592000 },
            { label: "day", secs: 86400 },
            { label: "hour", secs: 3600 },
            { label: "minute", secs: 60 },
            { label: "second", secs: 1 },
        ];

        for (const i of intervals) {
            const count = Math.floor(seconds / i.secs);
            if (count >= 1) return `${count} ${i.label}${count > 1 ? 's' : ''} ago`;

        }
        return "just now";

    };

    const companyName = job.companyName || (job.recruiter && job.recruiter.companyName) || "";
    return (
        <article className="card rounded-xl border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-base-100">
            <div className="card-body p-4 sm:p-5">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-base-content sm:text-xl truncate">{job.title}</h2>
                        {companyName && (
                            <p className="text-xs sm:text-sm text-base-content/60 mt-1 truncate">{companyName}</p>
                        )}
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-2 sm:mt-0 sm:ml-4 items-center">

                        <span className="badge bg-orange-100 text-orange-700 border-none whitespace-nowrap px-2 py-1">{job.jobType}</span>

                        <span className="badge badge-outline border-orange-400 text-orange-600
                        whitespace-nowrap px-2 py-1">{job.jobLevel}</span>
                    </div>
                </div>



                <div className="flex flex-wrap items-center text-xs sm:text-sm text-base-content/70 gap-1 mt-2">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                    <span>•</span>
                    <span>{job.salary}</span>
                </div>

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-base-content/70">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-medium shrink-0">Skills:</span>
                        <div className="flex flex-wrap gap-1 overflow-hidden">
                            {job.skillsRequired.map((skill) => (
                                <span
                                    key={skill}
                                    className="badge badge-soft badge-sm px-2 py-0.5 max-w-40 truncate"
                                    title={skill}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-1 sm:mt-0 sm:ml-4 shrink-0 whitespace-nowrap text-right">

                        <span className="font-medium">Posted:{" "}</span>

                        <span className="font-normal">
                            {formatDate(job.postedAt)} • {timeAgo(job.postedAt)}
                        </span>
                    </div>
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
