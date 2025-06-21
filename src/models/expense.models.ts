import mongoose, { Document, Schema } from 'mongoose';

export interface Expense extends Document {
    amount: number;
    reason: string;
    createdAt: Date;
}

const ExpenseSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Expense = mongoose.model<Expense>('Expense', ExpenseSchema);