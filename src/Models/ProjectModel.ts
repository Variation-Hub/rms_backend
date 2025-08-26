import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    projectName: string;
    publishedDate: Date;
    client: string;
    clientLocation: string;
    workType: string;
    dayRatesRange: {
        min: number;
        max: number;
    };
    noOfPositions: number;
    clearanceOrCertifications: string[];
    status: 'Active' | 'Future Role' | 'Expired';
    type: 'CIR' | 'ACR';
    isActive: boolean;
    createdAt: Date;
    createdBy: mongoose.Types.ObjectId;
    updatedAt: Date;
    updatedBy: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    publishedDate: {
        type: Date,
        required: [true, 'Published date is required']
    },
    client: {
        type: String,
        required: [true, 'Client is required'],
        trim: true
    },
    clientLocation: {
        type: String,
        required: [true, 'Client location is required'],
        trim: true
    },
    workType: {
        type: String,
        required: [true, 'Work type is required'],
        trim: true
    },
    dayRatesRange: {
        min: {
            type: Number,
            required: [true, 'Minimum day rate is required'],
            min: [0, 'Day rate cannot be negative']
        },
        max: {
            type: Number,
            required: [true, 'Maximum day rate is required'],
            min: [0, 'Day rate cannot be negative']
        }
    },
    noOfPositions: {
        type: Number,
        required: [true, 'Number of positions is required'],
        min: [1, 'Number of positions must be at least 1']
    },
    clearanceOrCertifications: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['Active', 'Future Role', 'Expired'],
        default: 'Active',
        required: [true, 'Status is required']
    },
    type: {
        type: String,
        enum: ['CIR', 'ACR'],
        required: [true, 'Type is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Created by is required']
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Updated by is required']
    }
}, {
    timestamps: true,
    versionKey: false
});

// Index for better query performance
ProjectSchema.index({ projectName: 1 });
ProjectSchema.index({ client: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ type: 1 });
ProjectSchema.index({ isActive: 1 });
ProjectSchema.index({ publishedDate: -1 });

// Pre-update middleware to validate day rates range
ProjectSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate() as any;
    if (update.dayRatesRange) {
        if (update.dayRatesRange.min > update.dayRatesRange.max) {
            return next(new Error('Minimum day rate cannot be greater than maximum day rate'));
        }
    }
    next();
});

export default mongoose.model<IProject>('Project', ProjectSchema);
