import { Response } from 'express';
import ProjectModel, { IProject } from '../Models/ProjectModel';

// Create a new project
export const createProject = async (req: any, res: Response) => {
    try {
        const projectData = req.body;

        // Set createdBy and updatedBy from authenticated user
        projectData.createdBy = req.user?.id;
        projectData.updatedBy = req.user?.id;

        const project = new ProjectModel(projectData);
        const savedProject = await project.save();

        return res.status(201).json({
            message: "Project created successfully",
            status: true,
            data: savedProject
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get all projects with pagination and filtering
export const getAllProjects = async (req: any, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;
        const {
            projectName,
            client,
            status,
            type,
            workType,
            isActive,
            startDate,
            endDate,
            minDayRate,
            maxDayRate
        } = req.query;

        // Build filter object
        const filter: any = {};

        if (projectName) {
            filter.projectName = { $regex: projectName, $options: 'i' };
        }

        if (client) {
            filter.client = { $regex: client, $options: 'i' };
        }

        if (status && status !== 'All') {
            filter.status = status;
        }

        if (type && type !== 'All') {
            filter.type = type;
        }

        if (workType) {
            filter.workType = { $regex: workType, $options: 'i' };
        }

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        // Date range filter
        if (startDate || endDate) {
            filter.publishedDate = {};
            if (startDate) {
                filter.publishedDate.$gte = new Date(startDate as string);
            }
            if (endDate) {
                filter.publishedDate.$lte = new Date(endDate as string);
            }
        }

        // Day rate range filter
        if (minDayRate || maxDayRate) {
            if (minDayRate && maxDayRate) {
                filter.$and = [
                    { 'dayRatesRange.min': { $lte: Number(maxDayRate) } },
                    { 'dayRatesRange.max': { $gte: Number(minDayRate) } }
                ];
            } else if (minDayRate) {
                filter['dayRatesRange.max'] = { $gte: Number(minDayRate) };
            } else if (maxDayRate) {
                filter['dayRatesRange.min'] = { $lte: Number(maxDayRate) };
            }
        }

        const projects = await ProjectModel.find(filter)
            .populate('createdBy', 'name email')
            .populate('updatedBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCount = await ProjectModel.countDocuments(filter);

        return res.status(200).json({
            message: "Projects fetched successfully",
            status: true,
            data: projects,
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

// Get project by ID
export const getProjectById = async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        const project = await ProjectModel.findById(id)
            .populate('createdBy', 'name email')
            .populate('updatedBy', 'name email');

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Project fetched successfully",
            status: true,
            data: project
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Update project
export const updateProject = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Set updatedBy from authenticated user
        updateData.updatedBy = req.user?.id;

        const project = await ProjectModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
                populate: [
                    { path: 'createdBy', select: 'name email' },
                    { path: 'updatedBy', select: 'name email' }
                ]
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Project updated successfully",
            status: true,
            data: project
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Delete project (soft delete by setting isActive to false)
export const deleteProject = async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        const project = await ProjectModel.findByIdAndUpdate(
            id,
            {
                isActive: false,
                updatedBy: req.user?.id
            },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Project deleted successfully",
            status: true,
            data: project
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Hard delete project (permanent removal)
export const hardDeleteProject = async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        const project = await ProjectModel.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "Project permanently deleted",
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

// Get project statistics
export const getProjectStats = async (req: any, res: Response) => {
    try {
        const stats = await ProjectModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalProjects: { $sum: 1 },
                    activeProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
                    },
                    futureRoleProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Future Role'] }, 1, 0] }
                    },
                    expiredProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Expired'] }, 1, 0] }
                    },
                    cirProjects: {
                        $sum: { $cond: [{ $eq: ['$type', 'CIR'] }, 1, 0] }
                    },
                    acrProjects: {
                        $sum: { $cond: [{ $eq: ['$type', 'ACR'] }, 1, 0] }
                    },
                    totalPositions: { $sum: '$noOfPositions' },
                    avgMinDayRate: { $avg: '$dayRatesRange.min' },
                    avgMaxDayRate: { $avg: '$dayRatesRange.max' }
                }
            }
        ]);

        return res.status(200).json({
            message: "Project statistics fetched successfully",
            status: true,
            data: stats[0] || {
                totalProjects: 0,
                activeProjects: 0,
                futureRoleProjects: 0,
                expiredProjects: 0,
                cirProjects: 0,
                acrProjects: 0,
                totalPositions: 0,
                avgMinDayRate: 0,
                avgMaxDayRate: 0
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

// Bulk update project status
export const bulkUpdateProjectStatus = async (req: any, res: Response) => {
    try {
        const { projectIds, status, updatedBy } = req.body;

        if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
            return res.status(400).json({
                message: "Project IDs array is required",
                status: false,
                data: null
            });
        }

        if (!['Active', 'Future Role', 'Expired'].includes(status)) {
            return res.status(400).json({
                message: "Invalid status. Must be one of: Active, Future Role, Expired",
                status: false,
                data: null
            });
        }

        const result = await ProjectModel.updateMany(
            { _id: { $in: projectIds } },
            {
                status,
                updatedBy: updatedBy || req.user?.id
            }
        );

        return res.status(200).json({
            message: `${result.modifiedCount} projects updated successfully`,
            status: true,
            data: {
                modifiedCount: result.modifiedCount,
                matchedCount: result.matchedCount
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

// Public API: Get projects with filters (no authentication required)
export const getPublicProjects = async (req: any, res: Response) => {
    try {
        const { 
            page = 1, 
            limit = 10,
            projectName, 
            client, 
            status, 
            type, 
            workType, 
            startDate,
            endDate,
            minDayRate,
            maxDayRate
        } = req.query;

        // Calculate skip for pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Build filter object
        const filter: any = { isActive: true }; // Only show active projects

        if (projectName) {
            filter.projectName = { $regex: projectName, $options: 'i' };
        }

        if (client) {
            filter.client = { $regex: client, $options: 'i' };
        }

        if (status && status !== 'All') {
            filter.status = status;
        }

        if (type && type !== 'All') {
            filter.type = type;
        }

        if (workType) {
            filter.workType = { $regex: workType, $options: 'i' };
        }

        // Date range filter
        if (startDate || endDate) {
            filter.publishedDate = {};
            if (startDate) {
                filter.publishedDate.$gte = new Date(startDate as string);
            }
            if (endDate) {
                filter.publishedDate.$lte = new Date(endDate as string);
            }
        }

        // Day rate range filter
        if (minDayRate || maxDayRate) {
            if (minDayRate && maxDayRate) {
                filter.$and = [
                    { 'dayRatesRange.min': { $lte: Number(maxDayRate) } },
                    { 'dayRatesRange.max': { $gte: Number(minDayRate) } }
                ];
            } else if (minDayRate) {
                filter['dayRatesRange.max'] = { $gte: Number(minDayRate) };
            } else if (maxDayRate) {
                filter['dayRatesRange.min'] = { $lte: Number(maxDayRate) };
            }
        }

        const projects = await ProjectModel.find(filter)
            .select('-createdBy -updatedBy -__v') // Exclude sensitive fields
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalCount = await ProjectModel.countDocuments(filter);

        return res.status(200).json({
            message: "Public projects fetched successfully",
            status: true,
            data: projects,
            meta_data: {
                page: Number(page),
                items: totalCount,
                page_size: Number(limit),
                pages: Math.ceil(totalCount / Number(limit))
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
