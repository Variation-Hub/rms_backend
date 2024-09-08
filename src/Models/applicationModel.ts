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
        enum: ['Active', 'Accepted', 'Under Review', 'Expired', 'Actioned', 'Not Submitted', 'Inactive', 'Submitted', 'Partially Uploaded']
    },
    no_of_resouces: {
        type: Number,
        default: 0
    },
    cvDetails: [mongoose.Schema.Types.Mixed]
}, { versionKey: false });

export default mongoose.model('JobApplication', JobApplication);