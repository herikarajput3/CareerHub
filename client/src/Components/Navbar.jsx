import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    )
}

export default Navbar