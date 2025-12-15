import { useState } from "react";

const Register = () => {
  const [role, setRole] = useState("candidate");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register", role);
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
                  ${
                    role === item
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
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="john@email.com"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          className="
            btn w-full mt-6
            bg-orange-600 hover:bg-orange-700
            text-white border-none
          "
        >
          Create Account
        </button>
      </form>
    </main>
  );
};

export default Register;
