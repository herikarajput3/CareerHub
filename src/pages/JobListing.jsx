import { getJobs } from '@/api/apiJobs'
import { useSession } from '@clerk/clerk-react';
import React, { useEffect } from 'react'

const JobListing = () => {
  const { session } = useSession();
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div>JobListing</div>
  )
}

export default JobListing