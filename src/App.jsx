import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OnBoarding from './pages/OnBoarding'
import AppLayout from './layouts/AppLayout'
import JobListing from './pages/JobListing'
import JobPage from './pages/JobPage'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import MyJob from './pages/MyJob'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />} >
            <Route path='/' element={<LandingPage />} />
            <Route path='/onboarding' element={<OnBoarding />} />
            <Route path='/jobs' element={<JobListing />} />
            <Route path='/job/:id' element={<JobPage />} />
            <Route path='/post-job' element={<PostJob />} />
            <Route path='/saved-job' element={<SavedJob />} />
            <Route path='/my-jobs' element={<MyJob />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
