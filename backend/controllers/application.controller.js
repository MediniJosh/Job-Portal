 import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
           

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if user already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Push application to job
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });

    } catch (error) {
        console.error("Apply Job Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Get all jobs the user has applied to
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.error("Get Applied Jobs Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Admin: View applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    select: 'fullname email phoneNumber profile' // Only return relevant fields
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("Get Applicants Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// Admin: Update application status (accept/reject)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
