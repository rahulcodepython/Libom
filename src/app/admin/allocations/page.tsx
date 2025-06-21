import { getBaseUrl } from "@/action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaginationType } from "@/hooks/usePagination"
import { AllocationRecordType } from "@/types/allocation.type"
import { AlertTriangle, Calendar, Clock } from "lucide-react"
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Allocations</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{5}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{5}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Near Due</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{5}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{5}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Returned</CardTitle>
                        <Calendar className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{5}</div>
                    </CardContent>
                </Card>
            </div>

            <AllocationList data={data} />
        </div>
    )
}
