import { routeHandlerWrapper } from "@/action";
import { Income } from "@/models/income.models";

export const PATCH = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const incomeData = await request.json();

    const income = await Income.findByIdAndUpdate(_id, incomeData, {
        new: true
    });

    if (!income) {
        return new Response(JSON.stringify({
            message: "Income not found",
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    await income.save();

    return new Response(JSON.stringify({
        message: "Income updated successfully",
        data: income
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});


export const DELETE = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const income = await Income.findByIdAndDelete(_id);

    if (!income) {
        return new Response(JSON.stringify({
            message: "Income not found",
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({
        message: "Income deleted successfully",
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});