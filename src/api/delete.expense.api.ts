export default async function deleteExpense(id: string) {
    const response = await fetch(`/api/expense/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete expense");
    }

    const data = await response.json();
    return data;
}
