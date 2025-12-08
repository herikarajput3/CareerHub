/* eslint-disable react/prop-types */
const JobCard = ({ job }) => {
    return (
        <article className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="card-body p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h2 className="card-title text-base sm:text-lg">
                        {job.title}
                    </h2>
                    <span className="badge badge-neutral badge-sm sm:badge-md">
                        {job.type}
                    </span>
                </div>

                <p className="text-sm font-medium text-base-content/80">
                    {job.company}
                </p>

                <p className="text-xs sm:text-sm text-base-content/60">
                    {job.location}
                </p>

                <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                    {job.salary}
                </p>

                <div className="card-actions mt-4 justify-end">
                    <button className="btn btn-sm btn-outline">
                        View Details
                    </button>
                </div>
            </div>
            <article className="card card-border shadow-sm hover:shadow-md transition-shadow duration-200 bg-base-100">
                <div className="card-body p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm: items-center sm:justify-between">
                        <h2 className="card-title text-base sm:text-lg">{job.title}</h2>
                        <div className="align-self-end">
                            <div className="badge badge-primary">Primary</div>
                            <div className="badge badge-primary">Primary</div>
                        </div>
                    </div>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </article>
        </article>
    );
};

export default JobCard;
