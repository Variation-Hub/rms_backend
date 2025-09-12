import { Request, Response } from 'express';
import ProjectModel from '../Models/ProjectModel';
import JobModelCIR from '../Models/JobModelCIR';
import userModel from '../Models/userModel';

// CIR Dashboard API
export const getCIRDashboard = async (req: Request, res: Response) => {
    try {
        // Get project statistics
        const projectStats = await ProjectModel.aggregate([
            {
                $match: { type: 'CIR' }
            },
            {
                $group: {
                    _id: null,
                    totalProjects: { $sum: 1 },
                    activeProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
                    },
                    futureProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Future Role'] }, 1, 0] }
                    },
                    expiredProjects: {
                        $sum: { $cond: [{ $eq: ['$status', 'Expired'] }, 1, 0] }
                    }
                }
            }
        ]);

        // Get job/role statistics for CIR projects
        const jobStats = await JobModelCIR.aggregate([
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project_id',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $unwind: {
                    path: '$project',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'project.type': 'CIR'
                }
            },
            {
                $addFields: {
                    currentDate: new Date(),
                    jobExpireDate: {
                        $cond: [
                            { $ne: ['$jobExpireDate', null] },
                            '$jobExpireDate',
                            new Date('2099-12-31') // Default far future date if no expiry
                        ]
                    }
                }
            },
            {
                $addFields: {
                    jobStatus: {
                        $cond: [
                            { $eq: ['$status', 'Inactive'] },
                            'Inactive',
                            {
                                $cond: [
                                    { $lt: ['$currentDate', '$jobExpireDate'] },
                                    'Active',
                                    'Expired'
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalJobs: { $sum: 1 },
                    activeJobs: {
                        $sum: { $cond: [{ $eq: ['$jobStatus', 'Active'] }, 1, 0] }
                    },
                    futureJobs: {
                        $sum: { $cond: [{ $eq: ['$jobStatus', 'Inactive'] }, 1, 0] }
                    },
                    expiredJobs: {
                        $sum: { $cond: [{ $eq: ['$jobStatus', 'Expired'] }, 1, 0] }
                    }
                }
            }
        ]);

        // Get user statistics
        const userStats = await userModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalUsers: { $sum: 1 },
                    activeUsers: {
                        $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                    },
                    inactiveUsers: {
                        $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] }
                    }
                }
            }
        ]);

        // Format the response
        const dashboardData = {
            projects: {
                total: projectStats[0]?.totalProjects || 0,
                active: projectStats[0]?.activeProjects || 0,
                future: projectStats[0]?.futureProjects || 0,
                expired: projectStats[0]?.expiredProjects || 0
            },
            jobs: {
                total: jobStats[0]?.totalJobs || 0,
                active: jobStats[0]?.activeJobs || 0,
                future: jobStats[0]?.futureJobs || 0,
                expired: jobStats[0]?.expiredJobs || 0
            },
            users: {
                total: userStats[0]?.totalUsers || 0,
                active: userStats[0]?.activeUsers || 0,
                inactive: userStats[0]?.inactiveUsers || 0
            }
        };

        return res.status(200).json({
            message: 'CIR Dashboard data retrieved successfully',
            status: true,
            data: {
                totalProjects: dashboardData.projects.total,
                activeProjects: dashboardData.projects.active,
                futureProjects: dashboardData.projects.future,
                expiredProjects: dashboardData.projects.expired,
                activeRoles: dashboardData.jobs.active,
                futureRoles: dashboardData.jobs.future,
                expiredRoles: dashboardData.jobs.expired,
                totalUsers: dashboardData.users.total,
                activeUsers: dashboardData.users.active,
                inactiveUsers: dashboardData.users.inactive
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
