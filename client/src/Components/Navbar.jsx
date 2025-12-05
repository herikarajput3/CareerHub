import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
const Navbar = () => {
    const [theme, setTheme] = useState('light');
    // jab bhi theme change ho, <html> pe data-theme set karo
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
                            className="dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-3 shadow space-y-1">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block text-sm px-2 py-1 rounded-md ${isActive ? "text-orange-600 font-semibold bg-base-200" : "text-base-content hover:bg-base-200"
                                        }`
                                    }>Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/jobs"
                                    className={({ isActive }) =>
                                        `block text-sm px-2 py-1 rounded-md ${isActive ? "text-orange-600 font-semibold bg-base-200" : "text-base-content hover:bg-base-200"
                                        }`
                                    }>Jobs</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block text-sm px-2 py-1 rounded-md ${isActive ? "text-orange-600 font-semibold bg-base-200" : "text-base-content hover:bg-base-200"
                                        }`
                                    }>About</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block text-sm px-2 py-1 rounded-md ${isActive ? "text-orange-600 font-semibold bg-base-200" : "text-base-content hover:bg-base-200"
                                        }`
                                    }>Contact</NavLink>
                            </li>
                            <li className="pt-2 mt-1 border-t border-base-300 flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    className="btn btn-ghost btn-sm w-full justify-center"
                                >Login</Link>
                                <Link
                                    to="/register"
                                    className="btn btn-neutral btn-sm text-white w-full justify-center"
                                >Register</Link>
                            </li>
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
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `transition-colors ${isActive ? "text-orange-600" : "text-base-content/80"
                                } hover:text-orange-600  hover:bg-base-100
                                `
                            }>Home</NavLink>

                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `transition-colors ${isActive ? "text-orange-600" : "text-base-content/80"
                                } hover:text-orange-600 hover:bg-base-100`
                            }>Jobs</NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `transition-colors ${isActive ? "text-orange-600" : "text-base-content/80"
                                } hover:text-orange-600  hover:bg-base-100`
                            }>About</NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `transition-colors ${isActive ? "text-orange-600" : "text-base-content/80"
                                } hover:text-orange-600  hover:bg-base-100`
                            }>Contact</NavLink>
                    </nav>
                </div>
                <div className="navbar-end gap-3 ">

                    {/* Sun / Moon icon button */}
                    {/* <button
                        onClick={handleThemeToggle}
                        className="btn btn-ghost btn-circle btn-sm px-3"
                        aria-label="Toggle theme"
                        
                    >
                        <span className="text-lg">
                            {theme === "dark" ? "🌞" : "🌙"}
                        </span>
                    </button> */}

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
                                className="w-5.5 h-5.5"
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


                    <div className="hidden sm:flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-neutral btn-sm text-white">Register</Link>
                    </div>
                </div>
            </div >
        </header>
    )
}

export default Navbar