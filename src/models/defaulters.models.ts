import mongoose, { Document, Schema } from 'mongoose';

export interface IDefaulter extends Document {
    allotmentId: string;
    amount: number;
    createdAt: Date;
}

const DefaulterSchema: Schema = new Schema({
    allotmentId: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Defaulter = mongoose.model<IDefaulter>('Defaulter', DefaulterSchema);