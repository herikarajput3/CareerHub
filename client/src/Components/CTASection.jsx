import { Link } from "react-router-dom";
import Brand from "./Brand";

const CTASection = () => {
  return (
    <section className="bg-linear-to-b from-base-200/40 to-transparent py-28">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold">
          Start your journey with <Brand size="text-3xl" />
        </h2>

        <p className="mt-4 text-base-content/60 max-w-xl mx-auto">
          Whether you’re finding your next opportunity or building a team,
          we’re here to help.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/jobs"
            className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Browse Jobs
          </Link>
          <Link to="/register" className="btn btn-neutral">
            Get Started
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
