"use client"

import submitBookWithPenalty from '@/api/penalty.book.api'
import submitBook from '@/api/submit.book.api'
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApiHandler } from '@/hooks/useApiHandler'
import usePagination, { PaginationType } from '@/hooks/usePagination'
import { AllocationRecordType } from '@/types/allocation.type'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SubmissionsList = ({ data }: { data: PaginationType<AllocationRecordType> }) => {
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
                allocation.usercode.toLowerCase().includes(lowerTerm) ||
                allocation.bookisbn.toLowerCase().includes(lowerTerm)
            )
            setFilteredData(filtered)
        }
    }

    useEffect(() => {
        setFilteredData(pagination.results)
    }, [pagination.results])

    const handleRemoveResult = (allocationId: string) => {
        pagination.removeData(allocationId)
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>All Allocations</CardTitle>
                <CardDescription className='text-right'>
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
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredData.map((allocation) => (
                                <SubmissionsRecordSingle key={allocation._id} allocation={allocation} handleRemoveResult={handleRemoveResult} />
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

const SubmissionsRecordSingle = ({ allocation, handleRemoveResult }: {
    allocation: AllocationRecordType,
    handleRemoveResult: (allocationId: string) => void
}) => {
    const diffDays = Math.floor((new Date(allocation.submissionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    const overDueDays = Math.floor((new Date().getTime() - new Date(allocation.submissionDate).getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = overDueDays > 0;

    const getDaysRemainingString = isOverdue ? `${overDueDays} days overdue` : `${diffDays} days left`;

    const getRowClassName = () => {
        if (isOverdue) {
            return "bg-red-50 border-l-4 border-red-500"
        } else if (diffDays <= 3) {
            return "bg-yellow-50 border-l-4 border-yellow-500"
        }
    }

    const { isLoading, callApi } = useApiHandler()

    const handleReturnBook = async () => {
        const responseData = await callApi(() => submitBook(allocation._id))

        if (responseData) {
            handleRemoveResult(allocation._id)
            toast.success(responseData.message || "Book returned successfully")
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
            <TableCell>{getDaysRemainingString}</TableCell>
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
            <TableCell>
                {
                    isOverdue ? (
                        <PenaltyDialog allocation={allocation} handleRemoveResult={handleRemoveResult} />
                    ) : (
                        <LoadingButton isLoading={isLoading}>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={allocation.isReturned || isLoading}
                                onClick={handleReturnBook}
                            >
                                Return Book
                            </Button>
                        </LoadingButton>
                    )
                }
            </TableCell>
        </TableRow>
    )
}

const PenaltyDialog = ({ allocation, handleRemoveResult }: { allocation: AllocationRecordType, handleRemoveResult: (allocationId: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [amount, setAmount] = useState(1)
    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        if (amount <= 0) {
            toast.error("Please enter a valid penalty amount")
            return
        }

        const responseData = await callApi(() => submitBookWithPenalty(allocation._id, amount), () => {
            setIsOpen(false)
            setAmount(0)
            handleRemoveResult(allocation._id)
        })

        if (responseData) {
            toast.success(responseData.message || "Book returned successfully")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={allocation.isReturned || isLoading}
                >
                    Return Book
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Penalty Amount (In Rupees)</DialogTitle>
                    <DialogDescription>Please enter the penalty amount to be charged.</DialogDescription>
                    <Input
                        type="number"
                        min={1}
                        placeholder="Enter penalty amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mb-4"
                    />
                    <div className='w-full flex items-center justify-end'>
                        <LoadingButton isLoading={isLoading}>
                            <Button onClick={handleSubmit} disabled={isLoading || amount <= 0}>
                                Submit Penalty
                            </Button>
                        </LoadingButton>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SubmissionsList