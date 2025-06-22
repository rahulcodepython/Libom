
import createExpense from "@/api/create.expense.api"
import editExpense from "@/api/edit.expense.api"
import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiHandler } from "@/hooks/useApiHandler"
import { ExpenseType } from "@/types/expense.type"
import { Edit, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const ExpenseForm = ({ edit = false, data, onSubmit }: {
    edit?: boolean
    data?: ExpenseType
    onSubmit: (data: ExpenseType) => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState<ExpenseType>(edit && data ? data : {
        _id: "",
        amount: 0,
        reason: "",
        createdAt: new Date(),
    } as ExpenseType)

    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        const responseData = await callApi(() => edit ? editExpense(formData) : createExpense(formData), () => {
            setFormData({
                _id: "",
                amount: 0,
                reason: "",
                createdAt: new Date(),
            } as ExpenseType)
            setIsDialogOpen(false)
        })

        if (responseData) {
            toast.success(responseData.message || ("Book created successfully"))
            onSubmit(responseData.data as ExpenseType)
            setIsDialogOpen(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {
                    edit ? <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                    </Button> : <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{edit ? "Edit Expense" : "Add New Expense"}</DialogTitle>
                    <DialogDescription>
                        {edit ? "Update expense record" : "Record a new expense entry"}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: Number.parseInt(e.target.value) })}
                                placeholder="1000"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="reason">Reason/Description</Label>
                            <Input
                                id="reason"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Description of expense source"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>
                            <Button type="submit" onClick={handleSubmit}>{edit ? "Update Expense" : "Add Expense"}</Button>
                        </LoadingButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseForm