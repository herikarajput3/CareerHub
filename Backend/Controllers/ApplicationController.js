const ApplicationSchema = require("../Models/ApplicationSchema");
const JobSchema = require("../Models/JobSchema");


exports.applyJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: 'Job id is required',
                success: false
            });
        };

        // Check if the user has already applied for this job
        const existingApplication = await ApplicationSchema.findOne({ applicant: userId, job: jobId });

        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this job',
                success: false
            });
        };

        // Check if job exists
        const job = await JobSchema.findById(jobId);

        if (!job) {
            return res.status(400).json({
                message: 'Job not found',
                success: false
            });
        };

        // Create application
        const application = await ApplicationSchema.create({ applicant: userId, job: jobId });

        // Add the application ID to the job's applications array

        JobSchema.applications.push(application._id);

        return res.status(201).json({
            message: 'Application created successfully',
            success: true,
            application
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await ApplicationSchema.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job', // Populate the 'job' field from the 'Application' model
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company', // Populate the 'company' field from the 'Job' model
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!applications) {
            return res.status(400).json({
                message: 'No applications found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Applications fetched successfully',
            success: true,
            applications
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

// For recruiter to see applications of a job from all applicants
exports.getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await JobSchema.findById(jobId).populate(
            {
                path: 'applications', // Populate the 'applications' field from the 'Job' model
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'applicant', // Populate the 'applicant' field from the 'Application' model
                    options: { sort: { createdAt: -1 } }
                }
            }
        );

        if (!job) {
            return res.status(400).json({
                message: 'Job not found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Applications fetched successfully',
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

exports.updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        const updatedApplication = await ApplicationSchema.findByIdAndUpdate(
            applicationId,
            { status: status.toLowerCase() },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }

        const allowedStatuses = ['pending', 'accepted', 'rejected'];
        if (!allowedStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: 'Invalid status value',
                success: false
            });
        }
        return res.status(200).json({
            message: 'Application status updated successfully',
            success: true,
            application: updatedApplication
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};