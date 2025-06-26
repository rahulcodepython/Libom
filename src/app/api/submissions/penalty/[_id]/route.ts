import { routeHandlerWrapper } from "@/action";
import { Allocation, IAllocation } from "@/models/allocation.models";
import { Book, IBook } from "@/models/books.models";
import { Defaulter, IDefaulter } from "@/models/defaulters.models";
import { IIncome, Income } from "@/models/income.models";

export const POST = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const { amount } = await request.json();

    if (typeof amount !== 'number' || !amount) {
        return new Response(JSON.stringify({ message: "Invalid amount" }), { status: 400 });
    }

    const defaulter: IDefaulter = new Defaulter({
        allotmentId: _id,
        amount: amount,
        createdAt: new Date()
    });

    await defaulter.save();

    const allocation: IAllocation | null = await Allocation.findByIdAndUpdate(_id,
        { isReturned: true, returnedDate: new Date() },
        { new: true }
    )

    if (!allocation) {
        return new Response(JSON.stringify({ message: "Allocation not found or already returned" }), { status: 404 });
    }

    const income: IIncome = new Income({
        amount: amount,
        reason: `Penalty for late return of book with ISBN ${allocation.bookisbn} by user with code ${allocation.usercode}`,
        createdAt: new Date()
    });
    await income.save();

    const book: IBook | null = await Book.findOne({ isbn: allocation.bookisbn });

    if (!book) {
        return new Response(JSON.stringify({ message: "Book not found" }), { status: 404 });
    }

    book.availableNumber += 1;
    await book.save();

    return new Response(JSON.stringify({ message: "Book returned successfully" }), { status: 200 });
});