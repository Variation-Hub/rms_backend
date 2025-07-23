import { Response } from 'express';
import { Candidate } from '../Models/CandidateModel';

// Create a new candidate
export const createCandidate = async (req: any, res: Response) => {
    try {
        const { name, email, joiningDate, status, agencyId } = req.body;
        const candidate = new Candidate({ agencyId, name, email, joiningDate, status });
        await candidate.save();
        res.json({
            message: 'Candidate created successfully',
            status: true,
            data: candidate
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            data: null,
            status: false
        });
    }
};

// Get all candidates for a specific agency
export const getCandidates = async (req: any, res: Response) => {
    
    try {
        const { agencyId } = req.params;
        const candidates = await Candidate.find({ agencyId });
        res.status(200).json({
            message: 'Candidates retrieved successfully',
            status: true,
            data: candidates
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            data: null,
            status: false
        });
    }
};

// Update candidate status
export const updateCandidateStatus = async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        const candidate = await Candidate.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!candidate) return res.status(404).send({
            message: 'Candidate not found',
            status: false,
            data: null
        });

        res.status(200).json({
            message: 'Candidate status updated successfully',
            status: true,
            data: candidate
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            data: null,
            status: false
        });
    }
};

// Delete a candidate
export const deleteCandidate = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findOneAndDelete({ _id: id });
        if (!candidate) return res.status(404).send({
            message: 'Candidate not found',
            status: false,
            data: null
        });

        res.status(200).json({
            message: 'Candidate deleted successfully',
            status: true,
            data: null
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            data: null,
            status: false
        });
    }
};
