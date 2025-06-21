import mongoose, { Document, models, Schema } from 'mongoose';

// Define the Book interface
export interface IBook extends Document {
    image: string;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    availableNumber: number;
    totalNumber: number;
}

// Define the Book schema
const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String, required: true },
    availableNumber: { type: Number, required: true, min: 0 },
    totalNumber: { type: Number, required: true, min: 0 },
});

export const Book = models.Book || mongoose.model<IBook>('Book', BookSchema);