import mongoose from "mongoose";

const ClientModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: ""
    },
    roles: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: "",
    }
}, { versionKey: false });

export default mongoose.model('clientModel', ClientModel);