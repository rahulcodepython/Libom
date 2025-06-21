import { BookType } from "@/types/book.type";

export default async function editBook(book: BookType) {
    const response = await fetch("/api/book", {
        method: "PATCH",
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit book");
    }

    const data = await response.json();
    return data;
}
