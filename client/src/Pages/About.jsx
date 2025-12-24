const About = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">

      {/* HERO */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold leading-tight">
          Built to make job searching{" "}
          <span className="text-orange-600">human</span> again
        </h1>
        <p className="mt-4 text-base-content/60 max-w-2xl mx-auto">
          CareerHub connects candidates and recruiters through a clean,
          transparent, and purpose-driven hiring experience.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-3">
          The problem with modern hiring
        </h2>
        <p className="text-base-content/70 leading-relaxed">
          Job searching today often feels overwhelming. Candidates face endless
          listings with little clarity, while recruiters struggle to manage
          applications efficiently. Important opportunities get lost in noise,
          and meaningful connections rarely happen.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-3">
          Our approach
        </h2>
        <p className="text-base-content/70 leading-relaxed">
          CareerHub was built to simplify this process. Candidates can discover
          relevant roles and track applications clearly, while recruiters can
          post jobs, review applicants, and make decisions with confidence —
          all from one intuitive platform.
        </p>
      </section>

      {/* VALUES */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">
          What we believe in
        </h2>

        <ul className="space-y-3 text-base-content/70">
          <li>• Clarity over clutter</li>
          <li>• Transparency over guesswork</li>
          <li>• Quality opportunities over quantity</li>
          <li>• Building trust between candidates and recruiters</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-base-content/70">
          Whether you’re searching for your next opportunity or building a team,
          CareerHub is here to support your journey.
        </p>
      </section>

    </main>
  );
};

export default About;
