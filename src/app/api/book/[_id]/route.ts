import { routeHandlerWrapper } from "@/action";
import { Book, IBook } from "@/models/books.models";

export const DELETE = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    if (!_id) {
        return new Response(JSON.stringify({ message: "Book ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const deletedBook: IBook | null = await Book.findByIdAndDelete(_id);

    if (!deletedBook) {
        return new Response(JSON.stringify({ message: "Book not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({
        message: "Book deleted successfully",
        data: deletedBook,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});