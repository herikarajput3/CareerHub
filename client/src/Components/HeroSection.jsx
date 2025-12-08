import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <section className='max-w-6xl mx-auto px-4 pt-24 pb-16 text-center sm:text-left flex flex-col gap-6'>

            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>Find your next
                <span className='text-orange-600'> dream job </span>
                with{" "}
                <span className='tracking-widest' style={{ fontFamily: "Pacifico" }}>Career<span className='text-orange-600'>Hub</span></span>
            </h1>

            <div className="badge inline-block font-medium bg-orange-100 text-orange-700 w-fit mx-auto sm:mx-0">500+ jobs posted this week</div>


            <p className='text-base-content/80 sm:text-lg max-w-2xl'> Browse curated job listings, track your applications, and connect with
                companies that value your skills and potential.</p>

            <Link
                to='/jobs'
                className="btn btn-neutral btn-md w-fit mx-auto sm:mx-0 px-8 py-5 rounded-full">Browse Jobs</Link>

        </section>

    )
}

export default HeroSection