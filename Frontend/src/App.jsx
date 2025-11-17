import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Layout from './layout/Layout'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Authentication Routes */}

          <Route path='/' element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
