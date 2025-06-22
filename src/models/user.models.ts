import mongoose, { Document, models, Schema } from 'mongoose';

export interface IUser extends Document {
    code: string;
    name: string;
    email: string;
    mobile: string;
    active: boolean;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

export const User = models.User || mongoose.model<IUser>('User', UserSchema);