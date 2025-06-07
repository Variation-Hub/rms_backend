import mongoose from 'mongoose';

const JobSchemaCIR = new mongoose.Schema({
    job_id: {
        type: String,
        trim: true,
        default: ""
    },
    job_title: {
        type: String,
        required: true,
        trim: true,
    },
    job_type: {
        type: String,
        enum: ['QA', 'Non-QA'],
        default: 'QA',
    },
    no_of_roles: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    client_name: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    day_rate: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["Active"],
        default: "Active"
    },
    candicateApplication: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CandidateApplication',
        required: true
    }],
    upload: {
        type: mongoose.Schema.Types.Mixed,
        default: {
        }
    },
    jobExpireDate: {
        type: Date,
        default: function () {
            const date = new Date();
            date.setDate(date.getDate() + 7); // Add 7 days to current date
            return date;
        }
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

export default mongoose.model('JobCIR', JobSchemaCIR);
