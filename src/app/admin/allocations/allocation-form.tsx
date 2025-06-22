import allocateBook from '@/api/allocate.book.api'
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApiHandler } from '@/hooks/useApiHandler'
import { AllocationFormType, AllocationRecordType } from '@/types/allocation.type'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const AllocationForm = ({
    onSubmit,
}: {
    onSubmit: (data: AllocationRecordType) => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState<AllocationFormType>({
        usercode: "",
        bookisbn: "",
    })

    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        const responseData = await callApi(() => allocateBook(formData as AllocationFormType), () => {
            setFormData({
                usercode: "",
                bookisbn: "",
            })
        })

        if (responseData) {
            toast.success(responseData.message || ("Book created successfully"))
            onSubmit(responseData.data as AllocationRecordType)
            setIsDialogOpen(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Allote Book
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Alloate book to user
                    </DialogTitle>
                    <DialogDescription>
                        Allote a book to a user
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="usercode">User Code</Label>
                            <Input
                                id="usercode"
                                value={formData.usercode}
                                onChange={(e) => setFormData({ ...formData, usercode: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="bookisbn">Book ISBN</Label>
                            <Input
                                id="bookisbn"
                                value={formData.bookisbn}
                                onChange={(e) => setFormData({ ...formData, bookisbn: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>
                            <Button type="submit" onClick={handleSubmit}>
                                Allocate Book
                            </Button>
                        </LoadingButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AllocationForm