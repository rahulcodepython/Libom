"use client"

import deleteIncome from "@/api/delete.income.api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApiHandler } from "@/hooks/useApiHandler"
import usePagination, { PaginationType } from "@/hooks/usePagination"
import { IncomeType } from "@/types/income.type"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import IncomeForm from "./income-form"

export default function IncomeList({ data }: { data: PaginationType<IncomeType> }) {
    const pagination = usePagination(data)

    const [filteredData, setFilteredData] = useState<IncomeType[]>(pagination.results)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setFilteredData(pagination.results)
    }, [pagination.results])

    const handleCreateIncome = (income: IncomeType) => {
        pagination.addData(income)
    }

    const handleEditIncome = (income: IncomeType) => {
        pagination.updateData(income._id, income)
    }

    const handleDelete = (incomeId: string) => {
        pagination.removeData(incomeId)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Income Records</h1>
                    <p className="text-muted-foreground">Track all library income and revenue</p>
                </div>
                <IncomeForm onSubmit={handleCreateIncome} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Income Records</CardTitle>
                    <CardDescription>All income transactions and revenue sources</CardDescription>
                    <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search income records..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                const term = e.target.value.toLowerCase();
                                setFilteredData(pagination.results.filter(income =>
                                    income.reason.toLowerCase().includes(term) ||
                                    income.amount.toString().includes(term)
                                ));
                            }}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredData.map((income) => (
                                    <TableRow key={income._id}>
                                        <TableCell>{new Date(income.createdAt).toLocaleDateString("en-GB")}</TableCell>
                                        <TableCell className="font-semibold text-green-600">₹{income.amount}</TableCell>
                                        <TableCell>{income.reason}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <IncomeForm
                                                    edit={true}
                                                    data={income}
                                                    onSubmit={handleEditIncome}
                                                />
                                                <DeleteIncomeButton
                                                    incomeId={income._id}
                                                    onDelete={handleDelete}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
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
        </div>
    )
}

const DeleteIncomeButton = ({ incomeId, onDelete }: { incomeId: string; onDelete: (id: string) => void }) => {
    const { callApi } = useApiHandler()

    const handleDelete = async () => {
        const responseData = await callApi(() => deleteIncome(incomeId), () => {
            onDelete(incomeId);
        });

        if (responseData) {
            toast.success(responseData.message || "Income deleted successfully");
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
}