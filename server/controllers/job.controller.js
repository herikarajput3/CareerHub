const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {

        // ✅ Only recruiter allowed
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: "Only recruiters can create jobs" });
        }
        const { title, description, location, jobType, salary, skillsRequired, jobLevel, experience, recruiter } = req.body;

        const job = await Job.create({
            title,
            description,
            location,
            jobType,
            salary,
            skillsRequired: skillsRequired ? skillsRequired.split(",") : [],
            jobLevel,
            experience,
            recruiter: req.user.id
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        })
    } catch (error) {
        console.error("Error while creating job", error);
        res.status(500).json({ message: error.message });
    }
}

exports.getJobs = async (req, res) => {
    try {

        const { role, location, companyName, postedAfter, postedBefore, jobType } = req.query;

        const query = { isOpen: true };

        if (role) {
            query.title = { $regex: role, $options: 'i' };
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (jobType) {
            query.jobType = { $regex: jobType, $options: 'i' };
        }

        if (postedAfter || postedBefore) {
            query.createdAt = {};
            if (postedAfter) {
                query.createdAt.$gte = new Date(postedAfter);
            }
            if (postedBefore) {
                query.createdAt.$lte = new Date(postedBefore);
            }
        }

        let jobsQuery = Job.find(query).populate({
            path: 'recruiter',
            select: 'name role companyName companyLocation'
        });

        let jobs = await jobsQuery.sort({ createdAt: -1 });

        if (companyName) {
            jobs = jobs.filter(job =>
                job.recruiter &&
                job.recruiter.companyName &&
                job.recruiter.companyName.toLowerCase().includes(companyName.toLowerCase())
            );
        }

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs
        })
    } catch (error) {
        console.error("Error while getting jobs", error);
        res.status(500).json({ message: error.message });
    }
}

