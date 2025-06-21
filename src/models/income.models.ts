import mongoose, { Document, models, Schema } from 'mongoose';

export interface Income extends Document {
    amount: number;
    reason: string;
    createdAt: Date;
}

const IncomeSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Income = models.Income || mongoose.model<Income>('Income', IncomeSchema);