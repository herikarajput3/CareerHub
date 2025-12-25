import Brand from "./Brand";

const FeaturesSection = () => {
  return (
    <section className="bg-base-200/40 py-24">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold">
            Why choose <Brand size="text-4xl" />?
          </h2>
          <p className="mt-3 text-base-content/60 max-w-2xl mx-auto">
            A hiring experience designed to be clear, focused, and human.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* Card */}
          <div className="bg-base-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Curated Job Listings
            </h3>
            <p className="text-base-content/70">
              Discover roles that actually match your skills — without noise.
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Application Tracking
            </h3>
            <p className="text-base-content/70">
              Know exactly where you stand with every application.
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Recruiter Dashboards
            </h3>
            <p className="text-base-content/70">
              Hire smarter with organized jobs and applicant insights.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;