// controllers/clientController.ts
import { Request, Response } from 'express';
import ClientModel from '../Models/clientUserModel';

// CREATE: Add a new client
export const createClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const client = new ClientModel(req.body);
        const savedClient = await client.save();
        return res.status(201).json({
            message: 'Client created successfully',
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

// GET ALL: Retrieve all clients
export const getAllClients = async (req: Request, res: Response): Promise<Response> => {
    try {
        const clients = await ClientModel.find();
        return res.status(200).json({
            message: 'Clients retrieved successfully',
            status: true,
            data: clients
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

// UPDATE: Update a client by ID
export const updateClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedClient = await ClientModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedClient) {
            return res.status(404).json({
                message: 'Client not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Client updated successfully',
            status: true,
            data: updatedClient
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

// DELETE: Delete a client by ID
export const deleteClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedClient = await ClientModel.findByIdAndDelete(id);

        if (!deletedClient) {
            return res.status(404).json({
                message: 'Client not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Client deleted successfully',
            status: true,
            data: deletedClient
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};
