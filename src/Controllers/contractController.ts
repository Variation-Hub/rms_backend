import { Request, Response } from 'express';
import contractModel from '../Models/contractModel';

// CREATE: Add a new contract
export const createContract = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req?.body?.title) {
            return res.status(400).json({
                message: 'Contract title is require.',
                status: false,
                data: null
            });
        }

        const contract = new contractModel(req.body);
        const savedClient = await contract.save();
        return res.status(201).json({
            message: 'Contract created successfully',
            status: true,
            data: savedClient
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

// GET ALL: Retrieve all contract
export const getAllContract = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contract = await contractModel.find();

        return res.status(200).json({
            message: 'contract retrieved successfully',
            status: true,
            data: contract
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

// UPDATE: Update a contact by ID
export const updateContract = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req?.body?.title) {
            return res.status(400).json({
                message: 'Contract title is require.',
                status: false,
                data: null
            });
        }

        const { id } = req.params;

        const updatedContract = await contractModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedContract) {
            return res.status(404).json({
                message: 'Contact not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Contact updated successfully',
            status: true,
            data: updatedContract
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

// DELETE: Delete a contract by ID
export const deleteContract = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedContract = await contractModel.findByIdAndDelete(id);

        if (!deletedContract) {
            return res.status(404).json({
                message: 'Contract not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Contract deleted successfully',
            status: true,
            data: deletedContract
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};