import mongoose, { Schema, Document } from "mongoose";

export interface IBannerText extends Document {
    page_type: string;
    content: string;
    background_color: string;
    logo: string;
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
    },
    background_color: {
        type: String,
        required: true,
        trim: true,
        default: "#ffffff",
        validate: {
            validator: function(v: string) {
                return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
            },
            message: 'Background color must be a valid hex color (e.g., #ff0000 or #f00)'
        }
    },
    logo: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v: string) {
                try {
                    new URL(v);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'Logo must be a valid URL'
        }
    }
}, { 
    timestamps: true,
    versionKey: false 
});

export default mongoose.model<IBannerText>("BannerText", bannerTextSchema);
