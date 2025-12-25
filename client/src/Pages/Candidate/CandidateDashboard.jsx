import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import SummaryCard from "../../Components/SummaryCard";

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get("/application/my");
        setApplications(res.data.applications || []);
      } catch (error) {
        console.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <p className="text-base-content/60">Loading your activity…</p>
      </section>
    );
  }

  // 📊 Summary counts
  const total = applications.length;
  const pending = applications.filter(a => a.status === "pending").length;
  const accepted = applications.filter(a => a.status === "accepted").length;
  const rejected = applications.filter(a => a.status === "rejected").length;

  return (
    <section className="space-y-8">

      {/* SUMMARY */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Your application activity
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SummaryCard label="Total" value={total} />
          <SummaryCard label="Pending" value={pending} />
          <SummaryCard label="Accepted" value={accepted} />
          <SummaryCard label="Rejected" value={rejected} />
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/applications"
          className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
        >
          View all applications
        </Link>

        <Link
          to="/jobs"
          className="btn btn-neutral"
        >
          Browse jobs
        </Link>
      </div>

    </section>
  );
};

export default CandidateDashboard;
