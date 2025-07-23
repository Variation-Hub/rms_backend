import mongoose, { Schema, Document } from "mongoose";

export interface IACRExtendJob extends Document {
    user_id: mongoose.Types.ObjectId; // Reference to ACRUser
    job_id: string;                   // Job code, e.g., "JD001"
    extended_by: mongoose.Types.ObjectId; // Admin or user who extended (optional)
    job_expire_date: Date;
    reason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const acrextendJobSchema = new Schema<IACRExtendJob>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "ACRUserModel",
        required: true
    },
    job_id: {
        type: String,
        required: true
    },
    extended_by: {
        type: Schema.Types.ObjectId,
        ref: "ACRUserModel", // or "ACRUserModel" if users can self-extend
        required: false
    },
    job_expire_date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: false,
        default: "No reason provided"
    }
}, { timestamps: true });

export default mongoose.model<IACRExtendJob>("ACRExtendJob", acrextendJobSchema);