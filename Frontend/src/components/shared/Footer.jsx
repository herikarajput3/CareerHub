import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h1
                            className="text-2xl font-extrabold tracking-wide mb-3 flex items-center gap-2"
                            style={{ fontFamily: "Pacifico, system-ui, -apple-system" }}
                        >
                            <span className="text-gray-900">Career</span>
                            <span className="text-[#F83002]">Hub</span>
                        </h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Helping job-seekers and employers connect — curated roles, honest
                            advice, and opportunity discovery.
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            <a
                                href="https://facebook.com"
                                aria-label="Facebook"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            >
                                {/* facebook */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                aria-label="Twitter"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            >
                                {/* twitter */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                aria-label="LinkedIn"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            >
                                {/* linkedin */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Explore</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link to="/" className="hover:text-gray-900 transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="hover:text-gray-900 transition">Jobs</Link>
                            </li>
                            <li>
                                <Link to="/companies" className="hover:text-gray-900 transition">Companies</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-900 transition">About</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link to="/blog" className="hover:text-gray-900 transition">Blog</Link>
                            </li>
                            <li>
                                <Link to="/help" className="hover:text-gray-900 transition">Help Center</Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-gray-900 transition">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-gray-900 transition">Terms</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Stay updated</h3>
                        <p className="text-sm text-gray-600 mb-3">Get the latest job alerts and career tips delivered to your inbox.</p>

                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                aria-label="Email for newsletter"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F83002]"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#F83002] text-white rounded-md text-sm hover:opacity-95 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">© {year} CareerHub. All rights reserved.</p>
                    <p className="text-sm text-gray-500">Built with ❤️ by <a className="text-gray-700 hover:underline" href="https://your-portfolio.example">Herika Rajput</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
