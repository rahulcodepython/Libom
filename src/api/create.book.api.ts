import { BookType } from "@/types/book.type";

export default async function createBook(book: BookType) {
    const response = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create book");
    }

    const data = await response.json();
    return data;
}