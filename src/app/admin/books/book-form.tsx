import createBook from '@/api/create.book.api'
import editBook from '@/api/edit.book.api'
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApiHandler } from '@/hooks/useApiHandler'
import { BookType } from '@/types/book.type'
import { Edit, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const BookForm = ({
    edit = false,
    data,
    onSubmit
}: {
    edit?: boolean
    data?: BookType
    onSubmit: (data: BookType) => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState(edit && data ? data : {
        _id: "",
        image: "",
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        availableNumber: 0,
        totalNumber: 0,
    })

    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        const responseData = await callApi(() => edit ? editBook(formData as BookType) : createBook(formData as BookType), () => {
            !edit && setFormData({
                _id: '',
                image: '',
                title: '',
                author: '',
                isbn: '',
                publisher: '',
                availableNumber: 0,
                totalNumber: 0,
            })
        })

        if (responseData) {
            toast.success(responseData.message || (edit ? "Book updated successfully" : "Book created successfully"))
            onSubmit(responseData.data)
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
                        <Plus className="h-4 w-4" />
                        Add Book
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{edit ? "Edit Book" : "Add New Book"}</DialogTitle>
                    <DialogDescription>
                        {edit ? "Update book information" : "Add a new book to the library"}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                value={formData.isbn}
                                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="publisher">Publisher</Label>
                            <Input
                                id="publisher"
                                value={formData.publisher}
                                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="totalBooks">Total Books</Label>
                            <Input
                                id="totalBooks"
                                type="number"
                                min={0}
                                value={formData.totalNumber}
                                onChange={(e) => setFormData({ ...formData, totalNumber: Number.parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="currentlyAvailable">Currently Available</Label>
                            <Input
                                id="currentlyAvailable"
                                type="number"
                                min={0}
                                max={formData.totalNumber}
                                value={formData.availableNumber}
                                onChange={(e) => setFormData({ ...formData, availableNumber: Number.parseInt(e.target.value) })}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>
                            <Button type="submit" onClick={handleSubmit}>{edit ? "Update Book" : "Add Book"}</Button>
                        </LoadingButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BookForm