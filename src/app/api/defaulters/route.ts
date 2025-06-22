import { routeHandlerWrapper } from "@/action";
import { Defaulter } from "@/models/defaulters.models";

export const GET = routeHandlerWrapper(async () => {
    const result = await Defaulter.aggregate([
        // STEP 1: Convert allotmentId string to ObjectId
        {
            $addFields: {
                allotmentObjectId: { $toObjectId: "$allotmentId" }
            }
        },

        // STEP 2: Lookup into Allocation using ObjectId
        {
            $lookup: {
                from: "allocations",
                localField: "allotmentObjectId",
                foreignField: "_id",
                as: "allocation"
            }
        },

        // STEP 3: Unwind to flatten single allocation object
        {
            $unwind: "$allocation"
        },

        // STEP 4: Lookup User
        {
            $lookup: {
                from: "users",
                localField: "allocation.usercode",
                foreignField: "code",
                as: "user"
            }
        },
        { $unwind: "$user" },

        // STEP 5: Lookup Book
        {
            $lookup: {
                from: "books",
                localField: "allocation.bookisbn",
                foreignField: "isbn",
                as: "book"
            }
        },
        { $unwind: "$book" },

        // STEP 6: Project final fields
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