import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Job from './Pages/Job'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Layout from './Layout/Layout'

function App() {
  return (
    <>
      <div className="min-h-screen" data-theme="light">
        <Router>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Job />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          
            </Route>

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
