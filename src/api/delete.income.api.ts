export default async function deleteIncome(id: string) {
    const response = await fetch(`/api/income/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete income");
    }

    const data = await response.json();
    return data;
}
