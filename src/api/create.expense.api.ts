import { ExpenseType } from "@/types/expense.type";

export default async function createExpense(formData: ExpenseType) {
    const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create expense");
    }

    const data = await response.json();
    return data;
}