import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { versionKey: false });

const FutureCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: [RolesSchema]
    },
    active: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
}, { versionKey: false });

export default mongoose.model('FutureCardSchema', FutureCardSchema);

