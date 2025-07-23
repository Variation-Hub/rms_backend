import mongoose from "mongoose";

const ContractModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

ContractModel.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('ContractModel', ContractModel);

