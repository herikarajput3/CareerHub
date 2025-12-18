import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Job from './Pages/Job'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Layout from './Layout/Layout'
import JobDetails from './Components/JobDetails'
import ProtectedRoute from './Routes/ProtectedRoute'
import ApplyJob from './Pages/Candidate/ApplyJob'
import PostJob from './Pages/Recruiter/PostJob'
import MyJobs from './Pages/Recruiter/MyJobs';
import { useAuth } from './Context/AuthContext'
import MyApplications from './Pages/Candidate/MyApplications'
import Applicants from './Pages/Recruiter/Applicants'

function App() {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <>
      <div className="min-h-screen">
        <Router>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Job />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* candidate routes */}

              <Route
                path="/apply/:jobId"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ApplyJob />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/applications"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <MyApplications />
                  </ProtectedRoute>
                }
              />

              {/* recruiter routes */}

              <Route
                path="/postjob"
                element={
                  <ProtectedRoute allowedRoles={["recruiter"]}>
                    <PostJob />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/myjobs"
                element={
                  <ProtectedRoute allowedRoles={["recruiter"]}>
                    <MyJobs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/myjobs/:jobId/applicants"
                element={
                  <ProtectedRoute allowedRoles={["recruiter"]}>
                    <Applicants />
                  </ProtectedRoute>
                }
              />


            </Route>

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
