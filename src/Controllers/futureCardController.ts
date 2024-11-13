import { Request, Response } from "express";
import FutureCard from '../Models/futureCardModel';

const paginate = (array: [], page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return array.slice(offset, offset + limit);
};

// Create a new FutureCard
export const createCard = async (req: Request, res: Response) => {
    try {
        const newCard = new FutureCard(req.body);
        const savedCard = await newCard.save();

        res.status(201).json({
            status: true,
            message: "Card created successfully",
            data: savedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Update an existing FutureCard
export const updateCard = async (req: Request, res: Response) => {
    try {
        const updatedCard = await FutureCard.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCard) return res.status(404).json({
            status: false,
            message: "Card not found",
            data: null
        });
        res.status(200).json({
            status: true,
            message: "Card updated successfully",
            data: updatedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Get all FutureCards
export const getAllCard = async (req: Request, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;

        const { keyword } = req.query

        const query: any = {}

        if (keyword) {
            query.name = { $regex: keyword, $options: "i" }
        }

        const totalCount = await FutureCard.countDocuments(query);
        const cards = await FutureCard.find(query, { roles: 0 }).skip(skip).limit(limit);
        res.status(200).json({
            status: true,
            message: "Cards retrieved successfully",
            data: cards,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / limit)
            }
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Get a FutureCard by ID
export const getCardById = async (req: Request, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;

        const keyword: any = req.query?.keyword;

        const card: any = await FutureCard.findById(req.params.id);

        if (!card) return res.status(404).json({
            status: false,
            message: "Card not found",
            data: null
        });

        let filteredRoles = card.roles;
        if (keyword) {
            filteredRoles = card.roles.filter((role: any) =>
                role?.title?.toLowerCase().includes(keyword?.toLowerCase()) ||
                role?.description?.toLowerCase().includes(keyword?.toLowerCase())
            );
        }

        const paginatedRoles = paginate(filteredRoles, +page, +limit);

        res.status(200).json({
            status: true,
            message: "Card retrieved successfully",
            data: {
                ...card.toObject(),
                roles: paginatedRoles
            },
            meta_data: {
                page,
                items: card.roles.length,
                page_size: limit,
                pages: Math.ceil(card.roles.length / limit)

            }
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Delete a FutureCard
export const deleteCard = async (req: Request, res: Response) => {
    try {
        const deletedCard = await FutureCard.findByIdAndDelete(req.params.id);

        if (!deletedCard) return res.status(404).json({
            status: false,
            message: "Card not found",
            data: null
        });
        res.status(200).json({
            status: true,
            message: "Card deleted successfully",
            data: deletedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Create a new Role within a FutureCard
export const createRole = async (req: Request, res: Response) => {
    try {
        const card = await FutureCard.findById(req.params.id);
        if (!card) return res.status(404).json({
            status: false,
            message: "Card not found", data: null
        });

        card.roles.push(req.body);
        const updatedCard = await card.save();
        res.status(201).json({
            status: true,
            message: "Role created successfully", data: updatedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Update a Role within a FutureCard
export const updateRole = async (req: Request, res: Response) => {
    try {
        const card = await FutureCard.findById(req.params.id);
        if (!card) return res.status(404).json({
            status: false,
            message: "Card not found", data: null
        });

        const role = card.roles.id(req.body.roleId);
        if (!role) return res.status(404).json({
            status: false,
            message: "Role not found", data: null
        });

        role.set(req.body);
        const updatedCard = await card.save();
        res.status(200).json({
            status: true,
            message: "Role updated successfully", data: updatedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

// Delete a Role within a FutureCard
export const deleteRole = async (req: Request, res: Response) => {
    try {
        const card = await FutureCard.findById(req.params.id);
        if (!card) return res.status(404).json({
            status: false,
            message: "Card not found",
            data: null
        });

        const roleIndex = card.roles.findIndex((role: any) => role._id.toString() === req.body.roleId);
        if (roleIndex === -1) {
            return res.status(404).json({
                status: false,
                message: "Role not found",
                data: null
            });
        }

        // Remove role by index
        card.roles.splice(roleIndex, 1);
        const updatedCard = await card.save();

        res.status(200).json({
            status: true,
            message: "Role deleted successfully",
            data: updatedCard
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};
