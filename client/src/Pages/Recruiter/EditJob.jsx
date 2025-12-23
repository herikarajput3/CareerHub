import React from 'react'
import JobForm from '../../Components/JobForm'
import { useParams } from 'react-router-dom'

const EditJob = () => {
    const { jobId } = useParams();
    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
            <JobForm mode='edit' jobId={jobId} />
        </main>
    )
}

export default EditJob