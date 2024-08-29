import mongoose from "mongoose";

const JobApplication = new mongoose.Schema({
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
    timer: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Accepted', 'Under Review', 'Expired', 'Actioned', 'Not Submitted', 'Inactive', 'Submitted']
    },
    no_of_resouces: {
        type: Number,
        default: 0
    },
    cv: [{
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }]
}, { versionKey: false });

export default mongoose.model('JobApplication', JobApplication);