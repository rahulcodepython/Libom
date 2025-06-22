import { routeHandlerWrapper } from "@/action";
import { Allocation } from "@/models/allocation.models";

export const GET = routeHandlerWrapper(async () => {
    const result = await Allocation.aggregate([
        {
            $match: {
                isReturned: false,
                submissionDate: { $lt: new Date() } // submissionDate has already passed
            }
        },
        {
            $lookup: {
                from: "users", // adjust if collection name differs
                localField: "usercode",
                foreignField: "code",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $lookup: {
                from: "books", // adjust if collection name differs
                localField: "bookisbn",
                foreignField: "isbn",
                as: "book"
            }
        },
        { $unwind: "$book" },
        {
            $project: {
                _id: 1,
                usercode: "$user.code",
                username: "$user.name",
                usermobile: "$user.mobile",
                useremail: "$user.email",
                bookisbn: "$book.isbn",
                booktitle: "$book.title",
                allotedDate: 1,
                submissionDate: 1,
                returnedDate: 1,
                isReturned: 1
            }
        }
    ]);


    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
})