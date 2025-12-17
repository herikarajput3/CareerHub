const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
    try {
        if (req.user.role !== 'candidate') {
            return res.status(403).json({ message: "Only candidates can apply for jobs" });
        }

        const { jobId, resumeUrl } = req.body;

        if (!jobId || !resumeUrl) {
            return res
                .status(400)
                .json({ message: "jobId and resumeUrl are required" });
        }

        // check if job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (!job.isOpen) {
            return res
                .status(400)
                .json({ message: "This job is no longer accepting applications" });
        }

        const application = await Application.create({
            jobId,
            candidateId: req.user.id,
            resumeUrl
        });

        res.status(201).json({
            message: "Job applied successfully",
            application
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        console.error("Error while applying job", error);
        res.status(500).json({ message: error.message });
    }
}

exports.getMyApplications = async (req, res) => {
    try {
        if (req.user.role !== 'candidate') {
            return res.status(403).json({ message: "Only candidates can view their applications" });
        }

        const applications = await Application.find({ candidateId: req.user.id }).populate({
            path: "jobId",
            select: "title location jobType companyName isOpen"
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your application fetched successfully",
            applications
        });

    } catch (error) {
        console.error("Error while getting your application", error);
        res.status(500).json({ message: error.message });
    }
}

exports.getApplicants = async (req, res) => {
    try {

        if (req.user.role !== "recruiter") {
            return res
                .status(403)
                .json({ message: "Only recruiters can view applicants" });
        }
        const { jobId } = req.params;

        // Pehle check karo ki job exist karti hai aur ye recruiter ki hi job hai

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You are not allowed to view applicants of this job" });
        }

        // Ab is job ke sab applications lao + candidate details populate karo

        const applications = await Application.find({ jobId }).populate({
            path: 'candidateId',
            select: 'name email phone profilePhoto resumeUrl skills bio'
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Applicants fetched successfully",
            applications
        });


    } catch (error) {
        console.error("Error while getting applicants", error);
        res.status(500).json({ message: error.message });
    }
}

exports.updateApplicationStatus = async (req, res) => {
    try {
        if (req.user.role !== "recruiter") {
            return res
                .status(403)
                .json({ message: "Only recruiters can update application status" });
        }
        const { applicationId, status } = req.body;

        if (!applicationId || !status) {
            return res
                .status(400)
                .json({ message: "applicationId and status are required" });
        }

        const application = await Application.findById(applicationId).populate("jobId");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Check: kya ye job iss recruiter ki hai?
        if (application.jobId.recruiter.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You are not allowed to update this application" });
        }

        // Status update karo
        application.status = status.toLowerCase();
        await application.save();

        // (Optional) Agar accepted hai to job close kar do
        if (application.status === "accepted") {
            application.jobId.isOpen = false;
            await application.jobId.save();
        }

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error("Error while updating application status", error);
        res.status(500).json({ message: error.message });
    }
}

exports.checkIfApplied = async (req, res) => {
    try {
        const application = await Application.findOne({
            jobId: req.params.jobId,
            candidateId: req.user.id
        });

        res.json({
            applied: !!application
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
