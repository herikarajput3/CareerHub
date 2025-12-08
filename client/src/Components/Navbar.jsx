import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const userRole = "candidate";
    const isGuest = userRole === "guest";

    const primaryLinks = [
        { to: "/", label: "Home" },
        { to: "/jobs", label: "Jobs" },
    ];

    const secondaryLinks = [
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ];

    const authLinks = {
        guest: [],
        candidate: [
            { to: "/application", label: "Application" },
        ],
        recruiter: [
            { to: "/postjob", label: "Post Job" },
        ],
    };

    const navlinks = [
        ...primaryLinks,
        ...authLinks[userRole],
        ...secondaryLinks
    ];

    const profileLinks = [
        { to: "/profile", label: "Profile" },
        { to: "/logout", label: "Logout" },
    ]

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
    return (
        <header className="bg-base-100 shadow-sm">
            <div className="navbar max-w-6xl mx-auto px-4">
                <div className="navbar-start">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            {/* hamburger icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-3 shadow space-y-1" >

                            {navlinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `block text-sm px-2 py-1 rounded-md ${isActive ? "text-orange-600 font-semibold bg-base-200" : "text-base-content hover:bg-base-200"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link
                        to={"/"}
                        className="text-2xl tracking-widest font-bold mx-5"
                        style={{ fontFamily: "Pacifico" }}
                    >
                        Career<span className="text-orange-600" >Hub</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {navlinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative pb-1 text-sm font-medium border-b-2 transition-all duration-500 ${isActive
                                        ? "text-orange-600 border-orange-600"
                                        : "text-base-content/80 border-transparent hover:text-orange-600 hover:border-orange-400"
                                    } `
                                }
                            >
                                {link.label}
                            </NavLink>

                        ))}
                    </nav>
                </div>

                <div className="navbar-end gap-3 ">

                    <button
                        onClick={handleThemeToggle}
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            // dark mode ON → moon dikhayenge
                            <img
                                src="https://img.icons8.com/?size=100&id=9313&format=png&color=FFFFFF"
                                alt="Dark mode"
                                className="w-5 h-5"
                            />
                        ) : (
                            // light mode ON → sun dikhayenge
                            <img
                                src="https://img.icons8.com/?size=100&id=45475&format=png&color=000000"
                                alt="Light mode"
                                className="w-5 h-5"
                            />
                        )}
                    </button>

                    {isGuest ? (
                        <div className="hidden sm:flex gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-neutral btn-sm text-white">Register</Link>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-7 sm:w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="mt-2 dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow-sm">
                                {profileLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink
                                            to={link.to}
                                            className={(link.label === "Logout") ? ("text-sm text-error font-medium") : ("text-sm text-base-content/80 font-medium")}
                                        >
                                            {link.label}</NavLink></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header >
    )
}

export default Navbar