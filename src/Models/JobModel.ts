import mongoose from 'mongoose';
import Counter from './JobCounter';


const JobSchema = new mongoose.Schema({
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
    timerEnd: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobApplication',
    }],
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
        default: function() {
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

JobSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    const now = new Date();
    this.timerEnd = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    next();
});

export default mongoose.model('Job', JobSchema);
