import mongoose from "mongoose";

const ReferAndEarn = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    }
});

export default mongoose.model('referAndEarnModel', ReferAndEarn);