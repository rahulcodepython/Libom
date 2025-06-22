import { routeHandlerWrapper } from "@/action";
import { Allocation } from "@/models/allocation.models";

export const GET = routeHandlerWrapper(async () => {
    const result = await Allocation.aggregate([
        {
            $addFields: {
                daysBetween: {
                    $divide: [
                        { $subtract: ["$submissionDate", "$allotedDate"] },
                        1000 * 60 * 60 * 24 // convert ms to days
                    ]
                }
            }
        },
        {
            $match: {
                daysBetween: { $lte: 5 }
            }
        },
        {
            $lookup: {
                from: "users", // ensure this matches the actual collection name
                localField: "usercode",
                foreignField: "code",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $lookup: {
                from: "books", // ensure this matches the actual collection name
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