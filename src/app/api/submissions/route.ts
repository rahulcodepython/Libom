import { routeHandlerWrapper } from "@/action";
import { Allocation } from "@/models/allocation.models";

export const GET = routeHandlerWrapper(async (request: Request) => {
    const page = parseInt(new URLSearchParams(new URL(request.url).search).get("page") || "1", 10);
    const limit = parseInt(new URLSearchParams(new URL(request.url).search).get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const allocations = await Allocation.aggregate([
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
                allotedDate: 1,
                submissionDate: 1,
                returnedDate: 1,
                isReturned: 1,
                usercode: "$user.code",
                username: "$user.name",
                bookisbn: "$book.isbn",
                booktitle: "$book.title",
            }
        },
        {
            $sort: { createdAt: -1 } // Sort by creation date in descending order
        },
        {
            $match: { isReturned: false }
        }
    ]);

    const filteredAllocations = allocations.slice(skip, skip + limit);

    return new Response(JSON.stringify({
        count: allocations.length,
        next: filteredAllocations.length > limit ? `/api/submissions?page=${page + 1}&limit=${limit}` : null,
        results: filteredAllocations
    }), { status: 200 });
});
