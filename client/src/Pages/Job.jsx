import { useEffect, useState } from 'react';
import JobCard from '../Components/JobCard';
import axios from 'axios';

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const [jobs, setJobs] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data.jobs);

      } catch (error) {
        console.log(error, "error");
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();

  }, [])

  const getCompanyName = (job) => {
    return (
      job.companyName ||
      (job.recruiter && job.recruiter.companyName) ||
      ""
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase().trim();
    const companyName = getCompanyName(job).toLowerCase();

    const matchesSearch = term === "" || job.title.toLowerCase().includes(term) || companyName.includes(term);

    const matchesLocation = locationFilter.trim() === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType = typeFilter === "" || job.jobType === typeFilter;

    const matchesLevel = levelFilter === "" || job.jobLevel === levelFilter;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesLevel
    );
  });

  return (
    <div>
      {/* this is for candidate or without logged in users only to see listed job */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Browse Jobs</h1>
          <p className="text-sm text-base-content/70">
            Find jobs that match your skills and preferences.
          </p>
        </div>

        {/* Filters bar */}
        <div className="grid gap-3 sm:grid-cols-4 mb-10">

          <input
            type="text"
            placeholder="Search by title or company"
            className="input input-sm sm:input-md input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="input input-sm sm:input-md input-bordered w-full"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <select
            className="select select-sm sm:select-md select-bordered w-full"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All job types</option>
            <option value="full time">Full-time</option>
            <option value="part time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
            <option value="freelance">Freelance</option>
          </select>


          <select
            className="select select-sm sm:select-md select-bordered w-full"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">All job levels</option>
            <option value="entry level">Entry level</option>
            <option value="mid level">Mid level</option>
            <option value="senior level">Senior level</option>

          </select>
        </div>

        {/* Yahin cards ka section aayega next step me */}
        {/* Job cards grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {isloading && <p>Loading...</p>}
          {error && <p className='text-error'>{error}</p>}
          {!isloading && !error && filteredJobs.length === 0 && (<p>No jobs found.</p>)}

          {!isloading && !error && filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

      </section>

    </div>
  )
}

export default Job