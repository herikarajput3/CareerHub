import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [role, setRole] = useState("candidate");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email";

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (role === "candidate") {
      if (!bio) newErrors.bio = "Bio is required";
      if (!skills) newErrors.skills = "Skills are required";
    }

    if (role === "recruiter") {
      if (!companyName)
        newErrors.companyName = "Company name is required";
    }

    // ❗ if any error exists
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ passed validation
    setErrors({});
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        phone,
        role,
        bio,
        skills,
        companyName,
        companyWebsite,
      });

      login(res.data.user, res.data.token);
      toast.success(`Welcome ${res.data.user.name}`);
      navigate("/");

    } catch (err) {
      console.log(err);
      setErrors({
        api: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md sm:max-w-lg
          bg-base-100 rounded-2xl
          border border-base-300
          p-6 sm:p-8
        "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Join CareerHub and find your next opportunity
          </p>
        </div>

        {/* Role selection */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Register as</p>

          <div className="grid grid-cols-2 gap-3">
            {["candidate", "recruiter"].map((item) => (
              <label
                key={item}
                className={`
                  cursor-pointer rounded-lg border px-4 py-3 text-center capitalize
                  transition
                  ${role === item
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-base-300 hover:bg-base-200"
                  }
                `}
              >
                <input
                  type="radio"
                  name="role"
                  value={item}
                  checked={role === item}
                  onChange={() => setRole(item)}
                  className="hidden"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="john@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              className="input input-bordered w-full"
              placeholder="+1 1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {role === "candidate" && (
          <div className="space-y-4 mt-6">
            <div>
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                type="text"
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              {errors.bio && (
                <p className="text-xs text-red-500 mt-1">{errors.bio}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="HTML, CSS, JS"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              {errors.skills && (
                <p className="text-xs text-red-500 mt-1">{errors.skills}</p>
              )}
              <p className="text-xs text-base-content/60 mt-1">
                Separate skills with commas
              </p>
            </div>
          </div>
        )}

        {role === "recruiter" && (
          <div className="space-y-4 mt-6">

            <div>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Company Website</span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://company.com"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>
          </div>
        )}

        {errors.api && (
          <div className="text-sm text-error bg-error/10 p-2 rounded-md">
            {errors.api}
          </div>
        )}


        <button
          type="submit"
          disabled={loading}
          className={`
            btn w-full mt-6
            bg-orange-600 hover:bg-orange-700
            text-white border-none
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-base-content/70 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </main>
  );
};

export default Register;
