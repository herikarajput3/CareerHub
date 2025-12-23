import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import JobForm from "../../Components/JobForm";

const PostJob = () => {
  // const { token } = useAuth();
  // const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   title: "",
  //   location: "",
  //   jobType: "",
  //   salary: "",
  //   experience: "",
  //   jobLevel: "",
  //   skillsRequired: "",
  //   description: "",
  // });

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     setError("");

  //     await axios.post(
  //       "http://localhost:5000/api/jobs",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     navigate("/myjobs");
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.message || "Failed to post job"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-base-content/60 mt-2 max-w-[65ch]">
          Fill in the details below to publish your job and start receiving applications.
        </p>
      </div>

      {/* Form Card */}
      {/* <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Basic Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Job Type</option>
              <option value="full time">Full-time</option>
              <option value="part time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
              <option value="freelance">Freelance</option>

            </select>

            <select
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Job Level</option>
              <option value="junior level">Junior</option>
              <option value="mid level">Mid</option>
              <option value="senior level">Senior</option>

            </select>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">
            Job Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="salary"
              placeholder="Salary (e.g. 20,000$)"
              value={formData.salary}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g. 2–4 years)"
              value={formData.experience}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills (comma separated)"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="input input-bordered w-full mt-4"
          />

          <textarea
            name="description"
            placeholder="Describe the role, responsibilities, and expectations"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mt-4"
            rows={5}
            required
          />
        </div>

        {error && (
          <div className="text-sm text-error bg-error/10 p-2 rounded-md">
            {error}
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full sm:w-auto px-8
              ${loading
                ? "btn-disabled"
                : "btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
              }`}
          >
            {loading ? "Posting…" : "Post Job"}
          </button>
        </div>
      </form> */}

      <JobForm mode="create" />
    </main>
  );
};

export default PostJob;
