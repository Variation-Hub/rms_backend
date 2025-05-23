import mongoose, { Schema, Document } from 'mongoose';
import contractModel from './contractModel';

export interface IContractDetails extends Document {
    title: string;
    description: string;
    contractId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ContractDetailsSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    contractId: {
        type: Schema.Types.ObjectId,
        ref: 'ContractModel',
        required: true
    }
}, {
    timestamps: true
});

const ContractDetailsModel = mongoose.model<IContractDetails>('ContractDetails', ContractDetailsSchema);
export default ContractDetailsModel;