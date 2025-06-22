import { IncomeType } from "@/types/income.type";

export default async function editIncome(formData: IncomeType) {
    const response = await fetch(`/api/income/${formData._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit income");
    }

    const data = await response.json();
    return data;
}