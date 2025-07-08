const JobSchema = require("../Models/JobSchema");

exports.postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        const userId = req.user.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        };

        const job = await JobSchema.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experience: Number(experience),
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: 'Job posted successfully',
            success: true,
            job
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

// For candidate
exports.getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        };
        const jobs = await JobSchema.find(query);

        if (!jobs) {
            return res.status(400).json({
                message: 'No jobs found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Jobs fetched successfully',
            success: true,
            jobs
        });
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

// For candidate

exports.getJobById = async (req, res) => {
    try {
        const job = await JobSchema.findById(req.params.id);

        if (!job) {
            return res.status(400).json({
                message: 'Job not found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Job fetched successfully',
            success: true,
            job
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

// For Recruiter
exports.getJobsByCompany = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const jobs = await JobSchema.find({ created_by: recruiterId });

        if (!jobs) {
            return res.status(400).json({
                message: 'No jobs found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Jobs fetched successfully',
            success: true,
            jobs
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}