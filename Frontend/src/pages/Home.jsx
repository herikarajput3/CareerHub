import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  )
}

export default Home