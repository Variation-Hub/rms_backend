import mongoose, { Schema, Document } from "mongoose";

export interface IBannerText extends Document {
    page_type: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const bannerTextSchema = new Schema<IBannerText>({
    page_type: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, { 
    timestamps: true,
    versionKey: false 
});

export default mongoose.model<IBannerText>("BannerText", bannerTextSchema);
