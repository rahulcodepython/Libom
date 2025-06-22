import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { AllocationRecordType } from "@/types/allocation.type"
import AllocationList from "./allocation-list"

export default async function AllocationsPage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/allocation`)

    const data: PaginationType<AllocationRecordType> = await response.json()

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Book Allocations</h1>
                <p className="text-muted-foreground">Track all book borrowing and returns</p>
            </div>

            <AllocationList data={data} />
        </div>
    )
}
