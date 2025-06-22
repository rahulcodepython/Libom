
import createIncome from "@/api/create.income.api"
import editIncome from "@/api/edit.income.api"
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
import { IncomeType } from "@/types/income.type"
import { Edit, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const IncomeForm = ({ edit = false, data, onSubmit }: {
    edit?: boolean
    data?: IncomeType
    onSubmit: (data: IncomeType) => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState<IncomeType>(edit && data ? data : {
        _id: "",
        amount: 0,
        reason: "",
        createdAt: new Date(),
    } as IncomeType)

    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        const responseData = await callApi(() => edit ? editIncome(formData) : createIncome(formData), () => {
            setFormData({
                _id: "",
                amount: 0,
                reason: "",
                createdAt: new Date(),
            } as IncomeType)
            setIsDialogOpen(false)
        })

        if (responseData) {
            toast.success(responseData.message || ("Book created successfully"))
            onSubmit(responseData.data as IncomeType)
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
                        Add Income
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{edit ? "Edit Income" : "Add New Income"}</DialogTitle>
                    <DialogDescription>
                        {edit ? "Update income record" : "Record a new income entry"}
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
                                placeholder="Description of income source"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>
                            <Button type="submit" onClick={handleSubmit}>{edit ? "Update Income" : "Add Income"}</Button>
                        </LoadingButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default IncomeForm