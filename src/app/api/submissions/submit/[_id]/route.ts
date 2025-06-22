import { routeHandlerWrapper } from "@/action";
import { Allocation, IAllocation } from "@/models/allocation.models";
import { Book, IBook } from "@/models/books.models";

export const POST = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const allocation: IAllocation | null = await Allocation.findByIdAndUpdate(_id,
        { isReturned: true, returnedDate: new Date() },
        { new: true }
    )

    if (!allocation) {
        return new Response(JSON.stringify({ message: "Allocation not found or already returned" }), { status: 404 });
    }

    const book: IBook | null = await Book.findOne({ isbn: allocation.bookisbn });

    if (!book) {
        return new Response(JSON.stringify({ message: "Book not found" }), { status: 404 });
    }

    book.availableNumber += 1;
    await book.save();

    return new Response(JSON.stringify({ message: "Book returned successfully" }), { status: 200 });
});