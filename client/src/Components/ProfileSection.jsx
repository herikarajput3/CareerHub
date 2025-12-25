import { useAuth } from "../Context/AuthContext";
import CandidateProfileSection from "./CandidateProfileSection";
import RecruiterProfileSection from "./RecruiterProfileSection";

const ProfileSection = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      {user.role === "candidate" && <CandidateProfileSection />}
      {user.role === "recruiter" && <RecruiterProfileSection />}
    </>
  );
};

export default ProfileSection;
