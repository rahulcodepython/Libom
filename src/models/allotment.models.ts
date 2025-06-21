import { Document, model, models, Schema } from 'mongoose';

interface IAllotment extends Document {
    userId: string;
    username: string;
    bookId: string;
    bookTitle: string;
    isbn: string;
    allotedDate: Date;
    submissionDate: Date;
    returnedDate?: Date;
    isReturned: boolean;
}

const AllotmentSchema: Schema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    bookId: { type: String, required: true },
    bookTitle: { type: String, required: true },
    isbn: { type: String, required: true },
    allotedDate: { type: Date, required: true },
    submissionDate: { type: Date, required: true },
    returnedDate: { type: Date },
    isReturned: { type: Boolean, required: true, default: false },
});

export const Allotment = models.Allotment || model<IAllotment>('Allotment', AllotmentSchema);