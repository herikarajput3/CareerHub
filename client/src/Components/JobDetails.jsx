
const JobDetails = () => {
    return (
        <main className='max-w-5xl mx-auto px-4 py-10'>
            <section className='grid gap-6 lg:grid-cols-[1fr,320px] lg:items-start'>
                <div>

                    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight">Job title</h1>

                    <p className="text-sm text-base-content/60 mt-1">company</p>

                    <dl className="mt-4 text-sm text-base-content/70 flex flex-wrap gap-2">
                        <div>
                            <dt className="sr-only">Location</dt>
                            <dd>California, USA</dd>
                        </div>
                        <span>•</span>

                        <div><dt className="sr-only">Experience</dt><dd>2 years</dd></div>

                        <span>•</span>

                        <div><dt className="sr-only">Salary</dt><dd>20,000</dd></div>

                    </dl>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <span className="text-sm font-medium mr-1">Skills:</span>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-base-200 text-xs">React</span>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-base-200 text-xs">Tailwind</span>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-base-200 text-xs">Node</span>
                        </div>
                    </div>


                    <p className="max-w-[70ch] text-base leading-relaxed mt-6 sm:text-lg">description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti doloribus nesciunt aliquid quaerat temporibus saepe sit, quos, sunt amet quis rem voluptatibus reiciendis dolores veritatis? Repudiandae enim eos libero non.</p>

                    <hr className="my-8 border-t border-base-200" />

                    <div className="mt-4 text-sm text-base-content/60">
                        Posted: 01 Dec 2025 • <span className="underline cursor-pointer">Share</span>
                    </div>

                </div>

                <aside className="lg:sticky lg:top-20">

                    <div className="rounded-xl border border-base-200 bg-base-100 p-4 sm:p-5 shadow-sm">

                        <div className="text-sm text-base-content/70">Type</div>
                        <div className="text-2xl font-semibold mt-1">Full Time</div>

                        <div className="mt-4">
                            <div className="text-sm text-base-content/70">Salary</div>
                            <div className="text-lg font-medium mt-1">20,000</div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary w-full mt-6 sm:w-auto px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                            aria-label="Apply for this job"
                        >Apply Now</button>

                    </div>
                </aside>
            </section>
        </main>
    )
}

export default JobDetails