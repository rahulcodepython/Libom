import { routeHandlerWrapper } from "@/action";
import { Expense, IExpense } from "@/models/expense.models";

export const PATCH = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const expenseData = await request.json();

    const expense: IExpense | null = await Expense.findByIdAndUpdate(_id, expenseData, {
        new: true
    });

    if (!expense) {
        return new Response(JSON.stringify({
            message: "Expense not found",
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    await expense.save();

    return new Response(JSON.stringify({
        message: "Expense updated successfully",
        data: expense
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});


export const DELETE = routeHandlerWrapper(async (request: Request, params: { _id: string }) => {
    const { _id } = params;

    const expense: IExpense | null = await Expense.findByIdAndDelete(_id);

    if (!expense) {
        return new Response(JSON.stringify({
            message: "Expense not found",
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({
        message: "Expense deleted successfully",
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});