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
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
}, { versionKey: false });

export default mongoose.model('clientModel', ClientModel);