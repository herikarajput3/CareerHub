import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OnBoarding from './pages/OnBoarding'
import AppLayout from './layouts/AppLayout'
import JobListing from './pages/JobListing'
import JobPage from './pages/JobPage'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import MyJob from './pages/MyJob'
import { ThemeProvider } from './components/ThemeProvider'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <OnBoarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/job/:id"
                element={
                  <ProtectedRoute>
                    <JobPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-job"
                element={
                  <ProtectedRoute>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-jobs"
                element={
                  <ProtectedRoute>
                    <SavedJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-jobs"
                element={
                  <ProtectedRoute>
                    <MyJob />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>

    </>
  )
}

export default App
