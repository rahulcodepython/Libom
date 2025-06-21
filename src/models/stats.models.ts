import mongoose, { Schema } from 'mongoose';

interface IStats extends Document {
    booksBorrowedToday: number;
    booksReturnedToday: number;
    totalCustomer: number;
    totalIncome: number;
    totalExpense: number;
    todayIncome: number;
    todayExpense: number;
    totalBooks: number;
    createdAt: Date;
}

const StatsSchema = new Schema({
    booksBorrowedToday: { type: Number, required: true, default: 0 },
    booksReturnedToday: { type: Number, required: true, default: 0 },
    totalCustomer: { type: Number, required: true, default: 0 },
    totalIncome: { type: Number, required: true, default: 0 },
    totalExpense: { type: Number, required: true, default: 0 },
    todayIncome: { type: Number, required: true, default: 0 },
    todayExpense: { type: Number, required: true, default: 0 },
    totalBooks: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export const Stats = mongoose.model<IStats>('Stats', StatsSchema);
