export default async function submitBookWithPenalty(_id: string, amount: number) {
    const response = await fetch(`/api/submissions/penalty/${_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit book");
    }

    const data = await response.json();
    return data;
}