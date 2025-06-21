import { AllocationFormType } from "@/types/allocation.type";

export default async function allocateBook(formData: AllocationFormType) {
    const response = await fetch('/api/allote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to allocate book');
    }

    return await response.json();
}