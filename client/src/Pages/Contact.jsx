const Contact = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">

      {/* HERO */}
      <section className="mb-14 text-center">
        <h1 className="text-4xl font-bold">
          Let’s talk
        </h1>
        <p className="mt-4 text-base-content/60 max-w-2xl mx-auto">
          Have a question, feedback, or need help?  
          We’re here and happy to listen.
        </p>
      </section>

      {/* HOW WE CAN HELP */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">
          How we can help
        </h2>

        <ul className="space-y-3 text-base-content/70">
          <li>• Questions about job listings or applications</li>
          <li>• Recruiter support or account help</li>
          <li>• Feedback to improve CareerHub</li>
          <li>• General questions about the platform</li>
        </ul>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="mb-16 rounded-xl border border-base-200 bg-base-100 p-6">
        <h2 className="text-xl font-semibold mb-3">
          Reach us directly
        </h2>

        <p className="text-base-content/70 mb-4">
          The best way to reach us is via email.  
          We usually respond within 24–48 hours.
        </p>

        <p className="text-base-content/80">
          📧{" "}
          <a
            href="mailto:support@careerhub.com"
            className="text-orange-600 font-medium hover:underline"
          >
            support@careerhub.com
          </a>
        </p>
      </section>

      {/* OPTIONAL FORM */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Or send us a message
        </h2>

        <form className="space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
          />

          <textarea
            rows={4}
            placeholder="Your message"
            className="textarea textarea-bordered w-full"
          />

          <button
            type="submit"
            className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Send message
          </button>
        </form>
      </section>

    </main>
  );
};

export default Contact;
