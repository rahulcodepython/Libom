"use client"

import deleteExpense from "@/api/delete.expense.api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApiHandler } from "@/hooks/useApiHandler"
import usePagination, { PaginationType } from "@/hooks/usePagination"
import { ExpenseType } from "@/types/expense.type"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ExpenseForm from "./expense-form"

export default function ExpenseList({ data }: { data: PaginationType<ExpenseType> }) {
    const pagination = usePagination(data)

    const [filteredData, setFilteredData] = useState<ExpenseType[]>(pagination.results)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setFilteredData(pagination.results)
    }, [pagination.results])

    const handleCreateExpense = (expense: ExpenseType) => {
        pagination.addData(expense)
    }

    const handleEditExpense = (expense: ExpenseType) => {
        pagination.updateData(expense._id, expense)
    }

    const handleDelete = (expenseId: string) => {
        pagination.removeData(expenseId)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Expense Records</h1>
                    <p className="text-muted-foreground">Track all library expenses and costs</p>
                </div>
                <ExpenseForm onSubmit={handleCreateExpense} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Expense Records</CardTitle>
                    <CardDescription>All expense transactions and categories</CardDescription>
                    <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search expense records..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                const term = e.target.value.toLowerCase();
                                setFilteredData(pagination.results.filter(expense =>
                                    expense.reason.toLowerCase().includes(term) ||
                                    expense.amount.toString().includes(term)
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
                                filteredData.map((expense) => (
                                    <TableRow key={expense._id}>
                                        <TableCell>{new Date(expense.createdAt).toLocaleDateString("en-GB")}</TableCell>
                                        <TableCell className="font-semibold text-red-600">₹{expense.amount}</TableCell>
                                        <TableCell>{expense.reason}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <ExpenseForm
                                                    edit={true}
                                                    data={expense}
                                                    onSubmit={handleEditExpense}
                                                />
                                                <DeleteExpenseButton
                                                    expenseId={expense._id}
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

const DeleteExpenseButton = ({ expenseId, onDelete }: { expenseId: string; onDelete: (id: string) => void }) => {
    const { callApi } = useApiHandler()

    const handleDelete = async () => {
        const responseData = await callApi(() => deleteExpense(expenseId), () => {
            onDelete(expenseId);
        });

        if (responseData) {
            toast.success(responseData.message || "Expense deleted successfully");
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
}