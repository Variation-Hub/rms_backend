import { Request, Response } from 'express';
import contractModel from '../Models/contractModel';
import ContractDetailsModel from '../Models/ContractDetailsModel';

// Create contract details
export const createContractDetails = async (req: Request, res: Response) => {
    try {
        const { title, description, contractId } = req.body;

        // Check if contract exists
        const contract = await contractModel.findById(contractId);
        if (!contract) {
            return res.status(404).json({
                message: "Contract not found",
                status: false,
                data: null
            });
        }

        const contractDetails = await ContractDetailsModel.create({
            title,
            description,
            contractId
        });

        return res.status(201).json({
            message: "Contract details created successfully",
            status: true,
            data: contractDetails
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get all contract details with pagination
export const getContractDetails = async (req: any, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;
        const { contractId } = req.query;

        let query: any = {};
        if (contractId) {
            query.contractId = contractId;
        }

        const totalCount = await ContractDetailsModel.countDocuments(query);
        const contractDetails = await ContractDetailsModel.find(query)
            .populate('contractId')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Contract details retrieved successfully",
            status: true,
            data: contractDetails,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / limit)
            }
        });
    } catch (error: any) {
        console.log("error", error)
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get contract details by ID
export const getContractDetailsById = async (req: Request, res: Response) => {
    try {
        const contractDetails = await ContractDetailsModel.findById(req.params.id)
            .populate('contractId');

        if (!contractDetails) {
            return res.status(404).json({
                message: "Contract details not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Contract details retrieved successfully",
            status: true,
            data: contractDetails
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Update contract details
export const updateContractDetails = async (req: Request, res: Response) => {
    try {
        const { title, description, contractId } = req.body;

        // If contractId is being updated, verify it exists
        if (contractId) {
            const contract = await contractModel.findById(contractId);
            if (!contract) {
                return res.status(404).json({
                    message: "Contract not found",
                    status: false,
                    data: null
                });
            }
        }

        const contractDetails = await ContractDetailsModel.findByIdAndUpdate(
            req.params.id,
            { title, description, contractId },
            { new: true }
        ).populate('contractId');

        if (!contractDetails) {
            return res.status(404).json({
                message: "Contract details not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Contract details updated successfully",
            status: true,
            data: contractDetails
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Delete contract details
export const deleteContractDetails = async (req: Request, res: Response) => {
    try {
        const contractDetails = await ContractDetailsModel.findByIdAndDelete(req.params.id);

        if (!contractDetails) {
            return res.status(404).json({
                message: "Contract details not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Contract details deleted successfully",
            status: true,
            data: null
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};