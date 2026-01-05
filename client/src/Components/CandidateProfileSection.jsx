  import { useEffect, useState } from "react";
  import axiosInstance from "../api/axiosInstance";
  import { useAuth } from "../Context/AuthContext";
  import toast from "react-hot-toast";

  const CandidateProfileSection = () => {
    const { user, setUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      name: "",
      bio: "",
      skills: "",
      resumeUrl: "",
      profilePhoto: "",
    });

    /* ---------------- PREFILL ---------------- */
    useEffect(() => {
      if (user) {
        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          skills: (user.skills || []).join(", "),
          resumeUrl: user.resumeUrl || "",
          profilePhoto: user.profilePhoto || "",
        });
      }
    }, [user]);

    /* ---------------- HANDLERS ---------------- */
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
      try {
        setLoading(true);

        const payload = {
          ...formData,
          skills: formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };

        const res = await axiosInstance.put("/users/me", payload);

        setUser(res.data.user);
        
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Profile updated");
        setIsEditing(false);
      } catch {
        toast.error("Failed to update profile");
      } finally {
        setLoading(false);
      }
    };

    /* ---------------- VIEW MODE ---------------- */
    if (!isEditing) {
      return (
        <section className="mb-12 rounded-xl border border-base-200 bg-base-100 p-6">
          <h2 className="text-xl font-semibold mb-4">👤 Your Profile</h2>

          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Bio:</span> {user.bio}</p>
            <p>
              <span className="font-medium">Skills:</span>{" "}
              {user.skills?.join(", ")}
            </p>

            {user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 underline inline-block mt-1"
              >
                📄 View Resume
              </a>
            )}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outline border-orange-500 text-orange-600 mt-6"
          >
            Edit Profile
          </button>
        </section>
      );
    }

    /* ---------------- EDIT MODE ---------------- */
    return (
      <section className="mb-12 rounded-xl border border-base-200 bg-base-100 p-6">
        <h2 className="text-xl font-semibold mb-4">✏️ Edit Profile</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Name"
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Skills (comma separated)"
          />

          <input
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Resume URL"
          />

          <input
            name="profilePhoto"
            value={formData.profilePhoto}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Profile photo URL"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn btn-outline border-orange-500 text-orange-600"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </div>
      </section>
    );
  };

  export default CandidateProfileSection;
