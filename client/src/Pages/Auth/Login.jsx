import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      login(res.data.user, res.data.token);
      navigate("/");

    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Login failed",
      });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-100 rounded-2xl border border-base-300 p-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Login to continue to CareerHub
          </p>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-error mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-xs text-error mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {errors.api && (
          <div className="text-sm text-error bg-error/10 p-2 rounded-md mt-4">
            {errors.api}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white border-none ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center text-base-content/70 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </main>
  );
};

export default Login;
