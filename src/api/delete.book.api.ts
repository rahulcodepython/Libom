export default async function deleteBook(bookId: string) {
    const response = await fetch(`/api/book/${bookId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete book");
    }

    const data = await response.json();
    return data;

}