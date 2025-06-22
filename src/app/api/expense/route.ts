import { routeHandlerWrapper } from "@/action";
import { Expense } from "@/models/expense.models";

export const GET = routeHandlerWrapper(async (request: Request) => {
    const page = parseInt(new URLSearchParams(new URL(request.url).search).get("page") || "1", 10);
    const limit = parseInt(new URLSearchParams(new URL(request.url).search).get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const expenses = await Expense.find({}, { __v: 0 })
        .sort({ createdAt: -1 })

    const filteredExpenses = expenses.slice(skip, skip + limit);

    return new Response(JSON.stringify({
        count: expenses.length,
        next: filteredExpenses.length > limit ? `/api/expense?page=${page + 1}&limit=${limit}` : null,
        results: filteredExpenses
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
})

export const POST = routeHandlerWrapper(async (request: Request) => {
    const { amount, reason, createdAt } = await request.json();
    const expense = new Expense({ amount, reason, createdAt });
    await expense.save();

    return new Response(JSON.stringify({
        message: "Expense created successfully",
        data: expense
    }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
});