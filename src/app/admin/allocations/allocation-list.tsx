"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import usePagination, { PaginationType } from '@/hooks/usePagination'
import { AllocationRecordType } from '@/types/allocation.type'
import { useEffect, useState } from 'react'
import AllocationForm from './allocation-form'

const AllocationList = ({ data }: { data: PaginationType<AllocationRecordType> }) => {
    const pagination = usePagination(data, 10)

    const [filteredData, setFilteredData] = useState<AllocationRecordType[]>(pagination.results)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        if (term.trim() === "") {
            setFilteredData(pagination.results)
        } else {
            const lowerTerm = term.toLowerCase()
            const filtered = pagination.results.filter(allocation =>
                allocation.username.toLowerCase().includes(lowerTerm) ||
                allocation.booktitle.toLowerCase().includes(lowerTerm)
            )
            setFilteredData(filtered)
        }
    }

    useEffect(() => {
        setFilteredData(pagination.results)
    }, [pagination.results])

    const handleAddAllocation = (newAllocation: AllocationRecordType) => {
        pagination.addData(newAllocation)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Allocations</CardTitle>
                <CardDescription className='text-right'>
                    <AllocationForm onSubmit={handleAddAllocation} />
                </CardDescription>
                <div className="flex items-center justify-center w-full">
                    <Input
                        placeholder="Search by user or book..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-[500px]"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Code</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>Book ISBN</TableHead>
                            <TableHead>Book Title</TableHead>
                            <TableHead>Alloted Date</TableHead>
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Submitted Date</TableHead>
                            <TableHead>Days Remaining</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredData.map((allocation) => (
                                <AllocationRecordSingle key={allocation._id} allocation={allocation} />
                            ))
                        }
                    </TableBody>
                </Table>

                <div className="mt-4 flex items-center justify-between">
                    <Button onClick={() => pagination.goToPage(pagination.pageNumber - 1)} disabled={pagination.pageNumber === 1}>
                        Previous
                    </Button>
                    <Button onClick={() => pagination.goToPage(pagination.pageNumber + 1)} disabled={!pagination.isNext}>
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const AllocationRecordSingle = ({ allocation }: { allocation: AllocationRecordType }) => {
    const diffDays = Math.floor((new Date(allocation.submissionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    const overDueDays = Math.floor((new Date().getTime() - new Date(allocation.submissionDate).getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = overDueDays > 0;

    const getDaysRemainingString = isOverdue ? `${overDueDays} days overdue` : `${diffDays} days left`;

    const getRowClassName = () => {
        console.log("diffDays", diffDays)
        if (allocation.isReturned) return ""
        if (isOverdue) {
            return "bg-red-50 border-l-4 border-red-500"
        } else if (diffDays <= 3) {
            return "bg-yellow-50 border-l-4 border-yellow-500"
        }
    }

    return (
        <TableRow key={allocation._id} className={getRowClassName()}>
            <TableCell className="font-medium">{allocation.usercode}</TableCell>
            <TableCell>{allocation.username}</TableCell>
            <TableCell>{allocation.bookisbn}</TableCell>
            <TableCell>{allocation.booktitle}</TableCell>
            <TableCell>{new Date(allocation.allotedDate).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>{new Date(allocation.submissionDate).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
                {allocation.returnedDate ? new Date(allocation.returnedDate).toLocaleDateString("en-GB") : "Not Yet Returned"}
            </TableCell>
            <TableCell>{allocation.isReturned ? "Returned" : getDaysRemainingString}</TableCell>
            <TableCell>
                {allocation.isReturned ? (
                    <span className="text-green-600">Returned</span>
                ) : isOverdue ? (
                    <span className="text-red-600 font-semibold">
                        Overdue
                    </span>
                ) : (
                    <span className={diffDays <= 3 ? "text-yellow-600 font-semibold" : ""}>
                        Pending
                    </span>
                )}
            </TableCell>
        </TableRow>
    )
}

export default AllocationList