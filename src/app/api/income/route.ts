import { routeHandlerWrapper } from "@/action";
import { Income } from "@/models/income.models";

export const GET = routeHandlerWrapper(async (request: Request) => {
    const page = parseInt(new URLSearchParams(new URL(request.url).search).get("page") || "1", 10);
    const limit = parseInt(new URLSearchParams(new URL(request.url).search).get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const incomes = await Income.find({}, { __v: 0 })
        .sort({ createdAt: -1 })

    const filteredIncomes = incomes.slice(skip, skip + limit);

    return new Response(JSON.stringify({
        count: incomes.length,
        next: filteredIncomes.length > limit ? `/api/income?page=${page + 1}&limit=${limit}` : null,
        results: filteredIncomes
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
})

export const POST = routeHandlerWrapper(async (request: Request) => {
    const { amount, reason, createdAt } = await request.json();
    const income = new Income({ amount, reason, createdAt });
    await income.save();

    return new Response(JSON.stringify({
        message: "Income created successfully",
        data: income
    }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
});