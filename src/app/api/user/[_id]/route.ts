import { routeHandlerWrapper } from "@/action";
import { User } from "@/models/user.models";

export const DELETE = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const userId = params._id;

    if (!userId) {
        return new Response(JSON.stringify({ message: "User ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({ message: "User deleted successfully" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});