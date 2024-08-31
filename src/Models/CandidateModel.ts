import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
    agencyId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

export const Candidate = mongoose.model('Candidate', CandidateSchema);
