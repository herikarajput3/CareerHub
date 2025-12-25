import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import SummaryCard from "../../Components/SummaryCard";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs/myJobs");
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Failed to load recruiter jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <p className="text-base-content/60">Loading your job activity…</p>
      </section>
    );
  }

  const total = jobs.length;
  const open = jobs.filter(j => j.isOpen).length;
  const closed = jobs.filter(j => !j.isOpen).length;

  return (
    <section className="space-y-8">

      {/* SUMMARY */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Your hiring activity
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <SummaryCard label="Total jobs" value={total} />
          <SummaryCard label="Open jobs" value={open} />
          <SummaryCard label="Closed jobs" value={closed} />
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/myjobs"
          className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
        >
          Manage jobs
        </Link>

        <Link
          to="/postjob"
          className="btn btn-neutral"
        >
          Post new job
        </Link>
      </div>

      {/* GUIDANCE */}
      <p className="text-sm text-base-content/60 max-w-xl">
        Keep your jobs open and updated to attract more relevant candidates.
        You can review applicants and update job status from your job listings.
      </p>

    </section>
  );
};

export default RecruiterDashboard;
