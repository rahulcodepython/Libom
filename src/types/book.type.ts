import { IBook } from "@/models/books.models";

export interface BookType extends IBook {
    _id: string
}