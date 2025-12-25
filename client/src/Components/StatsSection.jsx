const StatsSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">

        {[
          ["10k+", "Job seekers"],
          ["2k+", "Companies"],
          ["25k+", "Applications sent"],
          ["95%", "User satisfaction"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-4xl font-bold text-orange-600">{value}</p>
            <p className="text-sm text-base-content/60 mt-2">{label}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default StatsSection;
