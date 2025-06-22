import { Document, model, models, Schema } from 'mongoose';

export interface IAllocation extends Document {
    usercode: string;
    bookisbn: string;
    allotedDate: Date;
    submissionDate: Date;
    returnedDate?: Date;
    isReturned: boolean;
}

const AllocationSchema: Schema = new Schema({
    usercode: { type: String, required: true },
    bookisbn: { type: String, required: true },
    allotedDate: { type: Date, required: true },
    submissionDate: { type: Date, required: true },
    returnedDate: { type: Date },
    isReturned: { type: Boolean, required: true, default: false },
});

export const Allocation = models.Allocation || model<IAllocation>('Allocation', AllocationSchema);