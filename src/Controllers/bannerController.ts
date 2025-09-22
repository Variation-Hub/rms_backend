import { Request, Response } from 'express';
import BannerText from '../Models/BannerTextModel';

// Create or update banner text
export const createOrUpdateBannerText = async (req: Request, res: Response) => {
    try {
        const { page_type, content, background_color, logo } = req.body;

        if (!page_type || !content || !background_color || !logo) {
            return res.status(400).json({
                message: 'Page type, content, background color, and logo are required',
                status: false,
                data: null
            });
        }

        // Check if banner text for this page type already exists
        const existingBanner = await BannerText.findOne({ page_type });

        let bannerText;

        if (existingBanner) {
            // Update existing banner text
            bannerText = await BannerText.findOneAndUpdate(
                { page_type },
                { content, background_color, logo },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                message: 'Banner text updated successfully',
                status: true,
                data: bannerText
            });
        } else {
            // Create new banner text
            bannerText = await BannerText.create({
                page_type,
                content,
                background_color,
                logo
            });

            return res.status(201).json({
                message: 'Banner text created successfully',
                status: true,
                data: bannerText
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get banner text by page type
export const getBannerTextByPageType = async (req: Request, res: Response) => {
    try {
        const { page_type } = req.params;

        const bannerText = await BannerText.findOne({ page_type });

        if (!bannerText) {
            return res.status(404).json({
                message: 'Banner text not found for this page type',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Banner text retrieved successfully',
            status: true,
            data: bannerText
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get all banner texts
export const getAllBannerTexts = async (req: any, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;
        const { keyword } = req.query;

        let query: any = {};

        if (keyword) {
            query.$or = [
                { page_type: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } },
                { background_color: { $regex: keyword, $options: 'i' } },
                { logo: { $regex: keyword, $options: 'i' } }
            ];
        }

        const totalCount = await BannerText.countDocuments(query);

        const bannerTexts = await BannerText.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: 'Banner texts retrieved successfully',
            status: true,
            data: bannerTexts,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / (limit as number))
            }
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Update banner text by ID
export const updateBannerTextById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { page_type, content, background_color, logo } = req.body;

        if (!page_type || !content || !background_color || !logo) {
            return res.status(400).json({
                message: 'Page type, content, background color, and logo are required',
                status: false,
                data: null
            });
        }

        // Check if another banner text with the same page_type exists (excluding current one)
        const existingBanner = await BannerText.findOne({ 
            page_type, 
            _id: { $ne: id } 
        });

        if (existingBanner) {
            return res.status(400).json({
                message: 'Banner text with this page type already exists',
                status: false,
                data: null
            });
        }

        const bannerText = await BannerText.findByIdAndUpdate(
            id,
            { page_type, content, background_color, logo },
            { new: true, runValidators: true }
        );

        if (!bannerText) {
            return res.status(404).json({
                message: 'Banner text not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Banner text updated successfully',
            status: true,
            data: bannerText
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Delete banner text by ID
export const deleteBannerTextById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const bannerText = await BannerText.findByIdAndDelete(id);

        if (!bannerText) {
            return res.status(404).json({
                message: 'Banner text not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'Banner text deleted successfully',
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
