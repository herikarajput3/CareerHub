import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const RecruiterProfileSection = () => {
    const { user, setUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        companyWebsite: "",
        companyDescription: "",
        companyLocation: "",
        companyPhone: "",
    });

    /* ---------------- PREFILL ---------------- */
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                companyName: user.companyName || "",
                companyWebsite: user.companyWebsite || "",
                companyDescription: user.companyDescription || "",
                companyLocation: user.companyLocation || "",
                companyPhone: user.companyPhone || "",
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

            const res = await axiosInstance.put("/users/me", formData);

            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log("user", res.data.user);

            toast.success("Company profile updated");
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
                <h2 className="text-xl font-semibold mb-4">🏢 Company Profile</h2>

                <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Your name:</span> {user.name}</p>
                    <p><span className="font-medium">Company:</span> {user.companyName}</p>
                    <p><span className="font-medium">Website:</span> {user.companyWebsite || "—"}</p>
                    <p><span className="font-medium">Location:</span> {user.companyLocation || "—"}</p>
                    <p><span className="font-medium">Phone:</span> {user.companyPhone || "—"}</p>
                    <p className="max-w-xl">
                        <span className="font-medium">Description:</span>{" "}
                        {user.companyDescription || "—"}
                    </p>
                </div>

                <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline border-orange-500 text-orange-600 mt-6"
                >
                    Edit Company Profile
                </button>
            </section>
        );
    }

    /* ---------------- EDIT MODE ---------------- */
    return (
        <section className="mb-12 rounded-xl border border-base-200 bg-base-100 p-6">
            <h2 className="text-xl font-semibold mb-4">✏️ Edit Company Profile</h2>

            <div className="space-y-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Your name"
                />

                <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Company name"
                />

                <input
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Company website"
                />

                <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="Company description"
                />

                <input
                    name="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Company location"
                />

                <input
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Company phone"
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

export default RecruiterProfileSection;
