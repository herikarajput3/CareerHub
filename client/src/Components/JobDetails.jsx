import React from 'react'

const JobDetails = () => {
    return (
        <main className='max-w-6xl mx-auto px-4 py-10'>
            <section className='grid gap-6 lg:grid-cols-[1fr,320px] lg:items-start'>
                {/* left column main contaent */}
                <div> </div>
                {/* right column summary / CTA */}
                <aside> </aside>
                <h1>Job title</h1>
                <p>company</p>
                <div>Meta (location . experience salary)</div>
                <div>skills chips</div>
                <p>description</p>
                <button>apply</button>
            </section>
        </main>
    )
}

export default JobDetails