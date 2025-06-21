import { routeHandlerWrapper } from "@/action";
import { Allocation } from "@/models/allocation.models";
import { Book } from "@/models/books.models";
import { User } from "@/models/user.models";

export const POST = routeHandlerWrapper(async (request: Request) => {
    const { usercode, bookisbn } = await request.json()

    if (!usercode || !bookisbn) {
        return new Response(JSON.stringify({ message: "User code and book ISBN are required" }), { status: 400 });
    }

    const user = await User.findOne({ code: usercode });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const book = await Book.findOne({ isbn: bookisbn });

    if (!book) {
        return new Response(JSON.stringify({ message: "Book not found" }), { status: 404 });
    }

    const existingAllocation = await Allocation.findOne({ usercode, bookisbn, isReturned: false });

    if (existingAllocation) {
        return new Response(JSON.stringify({ message: "Book is already allocated to this user" }), { status: 400 });
    }

    const newAllocation = new Allocation({
        usercode,
        bookisbn,
        allotedDate: new Date(),
        submissionDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
        isReturned: false,
    })

    const savedAllocation = await newAllocation.save();

    const responseData = await Allocation.aggregate([
        { $match: { _id: savedAllocation._id } },
        {
            $lookup: {
                from: "users",
                localField: "usercode",
                foreignField: "code",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $lookup: {
                from: "books",
                localField: "bookisbn",
                foreignField: "isbn",
                as: "book"
            }
        },
        {
            $unwind: "$book"
        },
        {
            $project: {
                _id: 1,
                usercode: "$user.code",
                username: "$user.name",
                bookisbn: "$book.isbn",
                booktitle: "$book.title",
                allotedDate: 1,
                submissionDate: 1,
                returnedDate: 1,
                isReturned: 1,
            }
        }
    ])

    return new Response(JSON.stringify({ message: "Book allocated successfully", data: responseData[0] }), { status: 201 });
})