import mongoose from "mongoose";

const CandidateJobApplication = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job_id: {
        type: String,
        ref: 'Job',
        required: true
    },
    applied: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Applied']
    },
    cvDetails: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

export default mongoose.model('CandidateJobApplication', CandidateJobApplication);