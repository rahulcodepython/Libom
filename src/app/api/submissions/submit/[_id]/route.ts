import { routeHandlerWrapper } from "@/action";
import { Allocation } from "@/models/allocation.models";

export const POST = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const allocation = await Allocation.findByIdAndUpdate(_id,
        { isReturned: true, returnedDate: new Date() },
        { new: true }
    )

    if (!allocation) {
        return new Response(JSON.stringify({ message: "Allocation not found or already returned" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Book returned successfully" }), { status: 200 });
});