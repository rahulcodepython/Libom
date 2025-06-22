import { IncomeType } from "@/types/income.type";

export default async function createIncome(formData: IncomeType) {
    const responose = await fetch("/api/income", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!responose.ok) {
        const errorData = await responose.json();
        throw new Error(errorData.message || "Failed to create income");
    }

    const data = await responose.json();
    return data;
}