import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="text-xl text-white tracking-widest"
              style={{ fontFamily: "Pacifico" }}
            >
              Career<span className="text-orange-500">Hub</span>
            </Link>

            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Find jobs that match your skills, track applications, and
              connect with companies that value your potential.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-orange-500 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="hover:text-orange-500 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className="hover:text-orange-500 transition"
                >
                  Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-orange-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-500 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} CareerHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
