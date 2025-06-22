export default async function submitBook(_id: string) {
    const response = await fetch(`/api/submissions/submit/${_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit book");
    }

    const data = await response.json();
    return data;
}