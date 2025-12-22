const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {

        // ✅ Only recruiter allowed
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: "Only recruiters can create jobs" });
        }
        const { title, description, location, jobType, salary, skillsRequired, jobLevel, experience } = req.body;

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

        if (!jobs.length) {
            return res.status(200).json({
                message: "No jobs found",
                jobs: []
            });
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

exports.getMyJobs = async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: "Only recruiters can view their jobs" });
        }

        const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your jobs fetched successfully",
            jobs
        });

    } catch (error) {
        console.error("Error while getting recruiter jobs", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'recruiter',
        });

        res.status(200).json({
            message: "Job fetched successfully",
            job
        });
    } catch (error) {
        console.error("Error while getting job by id", error);
        res.status(500).json({ message: error.message });
    }
}

exports.updateJob = async (req, res) => {
    try {

        // ✅ Only recruiter allowed
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: "Only recruiters can update jobs" });
        }

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to update this job" });
        }

        const { title, description, location, jobType, salary, skillsRequired, jobLevel, experience } = req.body;

        if (title) job.title = title;
        if (description) job.description = description;
        if (location) job.location = location;
        if (jobType) job.jobType = jobType;
        if (salary) job.salary = salary;
        if (jobLevel) job.jobLevel = jobLevel;
        if (experience) job.experience = experience;

        if (skillsRequired) {
            job.skillsRequired = skillsRequired
                .split(",")
                .map((skill) => skill.trim());
        }

        await job.save();

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error("Error while updating job", error);
        res.status(500).json({ message: error.message });
    }
}

exports.updateJobStatus = async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: "Only recruiters can update job status" });
        }

        const { isOpen } = req.body;
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to update this job" });
        }

        job.isOpen = isOpen;
        await job.save();

        res.status(200).json({
            message: "Job status updated successfully",
            job
        });
    } catch (error) {
        console.error("Error while updating job status", error);
        res.status(500).json({ message: error.message });
    }
}
exports.deleteJob = async (req, res) => {
    try {
        if (req.user.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can delete jobs",
            });
        }

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this job",
            });
        }

        await job.deleteOne();

        res.status(200).json({
            message: "Job deleted successfully",
        });
    } catch (error) {
        console.error("Error while deleting job", error);
        res.status(500).json({ message: error.message });
    }
};
