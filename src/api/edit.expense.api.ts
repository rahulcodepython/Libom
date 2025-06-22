import { ExpenseType } from "@/types/expense.type";

export default async function editExpense(formData: ExpenseType) {
    const response = await fetch(`/api/expense/${formData._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit expense");
    }

    const data = await response.json();
    return data;
}