import JobCard from '../Components/JobCard';

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full-time",
    salary: "₹6L - ₹10L",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeWorks",
    location: "Bangalore",
    type: "Part-time",
    salary: "₹4L - ₹7L",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Designify",
    location: "Delhi",
    type: "Internship",
    salary: "₹10k - ₹20k / month",
  },
];

const dummyJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    location: "California, USA",
    jobType: "Full-time",
    jobLevel: "Mid Level",
    salary: "20,000$",
    experience: "2 years",
    skillsRequired: ["React", "Tailwind", "JavaScript"],
    postedAt: "2025-12-01",
  },
  {
    _id: "2",
    title: "Backend Developer",
    location: "Remote",
    jobType: "Part-time",
    jobLevel: "Senior",
    salary: "30,000$",
    experience: "4 years",
    skillsRequired: ["Node.js", "MongoDB", "Express"],
    postedAt: "2025-11-28",
  },
  {
    _id: "3",
    title: "UI/UX Designer",
    location: "Toronto, Canada",
    jobType: "Full-time",
    jobLevel: "Junior",
    salary: "18,000$",
    experience: "1 year",
    skillsRequired: ["Figma", "Wireframing", "Prototyping"],
    postedAt: "2025-12-02",
  },
];

const Job = () => {
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
        <div className="grid gap-3 sm:grid-cols-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or company"
            className="input input-sm sm:input-md input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-sm sm:input-md input-bordered w-full"
          />
          <select className="select select-sm sm:select-md select-bordered w-full">
            <option value="">All job types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="contract">Remote</option>
            <option value="contract">Freelance</option>
          </select>
          <select className="select select-sm sm:select-md select-bordered w-full">
            <option value="">All job levels</option>
            <option value="entry-level">Entry level</option>
            <option value="mid-level">Mid level</option>
            <option value="senior-level">Senior level</option>
          </select>
        </div>

        {/* Yahin cards ka section aayega next step me */}
        {/* Job cards grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

      </section>

    </div>
  )
}

export default Job