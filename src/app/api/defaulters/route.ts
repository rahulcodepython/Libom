import { routeHandlerWrapper } from "@/action";
import { Defaulter, IDefaulter } from "@/models/defaulters.models";

export const GET = routeHandlerWrapper(async () => {
    const result: IDefaulter[] = await Defaulter.aggregate([
        {
            $addFields: {
                allotmentObjectId: { $toObjectId: "$allotmentId" }
            }
        },
        {
            $lookup: {
                from: "allocations",
                localField: "allotmentObjectId",
                foreignField: "_id",
                as: "allocation"
            }
        },
        {
            $unwind: "$allocation"
        },
        {
            $lookup: {
                from: "users",
                localField: "allocation.usercode",
                foreignField: "code",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $lookup: {
                from: "books",
                localField: "allocation.bookisbn",
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
                booktitle: "$book.title",
                bookisbn: "$book.isbn",
                allotedDate: "$allocation.allotedDate",
                returnedDate: "$allocation.returnedDate",
                amount: 1,
                createdAt: 1,
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