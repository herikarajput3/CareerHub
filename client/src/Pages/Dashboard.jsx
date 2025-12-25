import { useAuth } from "../Context/AuthContext";
import ProfileSection from "../Components/ProfileSection";
import CandidateDashboard from "./Candidate/CandidateDashboard";
import RecruiterDashboard from "./Recruiter/RecruiterDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Shared Profile */}
      <ProfileSection />

      {/* Role-based */}
      {user.role === "candidate" && <CandidateDashboard />}
      {user.role === "recruiter" && <RecruiterDashboard />}
    </main>
  );
};

export default Dashboard;
