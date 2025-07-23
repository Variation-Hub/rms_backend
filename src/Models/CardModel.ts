import mongoose from "mongoose";
import { cardType } from "../Util/contant";

const CardModel = new mongoose.Schema({
    rolesInDemand: {
        type: String,
        trim: true,
        default: ""
    },
    roleDescription: {
        type: String,
        trim: true,
        default: ""
    },
    certifications_qualifications: {
        type: String,
        trim: true,
        default: ""
    },
    valueA: {
        type: String,
        trim: true,
        default: ""
    },
    valueB: {
        type: String,
        trim: true,
        default: ""
    },
    valueC: {
        type: String,
        trim: true,
        default: ""
    },
    file: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    type: {
        type: String,
        enum: cardType,
        required: true,
        default: cardType.CIR
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, minimize: false });

CardModel.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('card', CardModel);