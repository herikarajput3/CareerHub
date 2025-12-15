const JobDetailsSkeleton = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      <section className="grid gap-6 lg:grid-cols-[1fr,320px] lg:items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* Title */}
          <div className="h-10 w-3/4 rounded bg-base-300" />

          {/* Company */}
          <div className="h-4 w-1/4 rounded bg-base-300" />

          {/* Meta info */}
          <div className="flex gap-3">
            <div className="h-4 w-20 rounded bg-base-300" />
            <div className="h-4 w-16 rounded bg-base-300" />
            <div className="h-4 w-20 rounded bg-base-300" />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-6 w-16 rounded-full bg-base-300"
              />
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-base-300" />
            <div className="h-4 w-full rounded bg-base-300" />
            <div className="h-4 w-5/6 rounded bg-base-300" />
            <div className="h-4 w-2/3 rounded bg-base-300" />
          </div>

          {/* Footer */}
          <div className="h-4 w-40 rounded bg-base-300 mt-4" />
        </div>

        {/* RIGHT COLUMN */}
        <aside className="lg:sticky lg:top-20">
          <div className="rounded-xl border border-base-300 bg-base-200 p-5 space-y-5">

            <div>
              <div className="h-4 w-16 rounded bg-base-300" />
              <div className="h-6 w-24 rounded bg-base-300 mt-2" />
            </div>

            <div>
              <div className="h-4 w-16 rounded bg-base-300" />
              <div className="h-5 w-28 rounded bg-base-300 mt-2" />
            </div>

            {/* Button */}
            <div className="h-11 w-full rounded-lg bg-base-300 mt-6" />
          </div>
        </aside>

      </section>
    </main>
  );
};

export default JobDetailsSkeleton;
