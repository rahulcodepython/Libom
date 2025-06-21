"use client"


import deleteBook from "@/api/delete.book.api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApiHandler } from "@/hooks/useApiHandler"
import usePagination, { PaginationType } from "@/hooks/usePagination"
import { BookType } from "@/types/book.type"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import BookForm from "./book-form"

interface Book {
    _id: string
    title: string
    image: string
    author: string
    isbn: string
    edition: string
    publisher: string
    published: string
    totalBooksAvailable: number
    currentlyAvailable: number
    category: string
}

const mockBooks: Book[] = [
    {
        _id: "1",
        title: "The Great Gatsby",
        image: "/placeholder.svg?height=100&width=80",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        edition: "1st",
        publisher: "Scribner",
        published: "1925",
        totalBooksAvailable: 10,
        currentlyAvailable: 7,
        category: "Fiction",
    },
    {
        _id: "2",
        title: "To Kill a Mockingbird",
        image: "/placeholder.svg?height=100&width=80",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        edition: "1st",
        publisher: "J.B. Lippincott & Co.",
        published: "1960",
        totalBooksAvailable: 8,
        currentlyAvailable: 5,
        category: "Fiction",
    },
    {
        _id: "3",
        title: "1984",
        image: "/placeholder.svg?height=100&width=80",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        edition: "1st",
        publisher: "Secker & Warburg",
        published: "1949",
        totalBooksAvailable: 12,
        currentlyAvailable: 8,
        category: "Dystopian Fiction",
    },
]

export default function BooksList({ data }: { data: PaginationType<BookType> }) {
    const pagination = usePagination<BookType>(data, 10)

    const [filteredResults, setFilteredResults] = useState<BookType[]>(pagination.results)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setFilteredResults(pagination.results)
    }, [pagination.results])

    const handleCreate = (newBook: BookType) => {
        pagination.addData(newBook)
    }

    const handleEdit = (updatedBook: BookType) => {
        pagination.updateData(updatedBook._id, updatedBook)
    }

    const handleDelete = (bookId: string) => {
        pagination.removeData(bookId)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Books Management</h1>
                    <p className="text-muted-foreground">Manage library books and inventory</p>
                </div>
                <BookForm onSubmit={handleCreate} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Books Inventory</CardTitle>
                    <CardDescription className="text-right">Total books: {filteredResults.length}</CardDescription>
                    <div className="flex items-center w-full justify-center">
                        <Input
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                const term = e.target.value.toLowerCase();
                                setFilteredResults(pagination.results.filter(book =>
                                    book.title.toLowerCase().includes(term) ||
                                    book.author.toLowerCase().includes(term) ||
                                    book.isbn.toLowerCase().includes(term) ||
                                    book.publisher.toLowerCase().includes(term)
                                ));
                            }}
                            className="w-[500px]"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead>Publisher</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredResults.map((book) => (
                                    <TableRow key={book._id}>
                                        <TableCell>
                                            <Image
                                                src={"/placeholder.svg"}
                                                alt={book.title}
                                                width={40}
                                                height={50}
                                                className="rounded object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                        <TableCell>{book.publisher}</TableCell>
                                        <TableCell>
                                            {book.availableNumber}/{book.totalNumber}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={book.availableNumber > 0 ? "default" : "destructive"}>
                                                {book.totalNumber > 0 ? "Available" : "Out of Stock"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <BookForm
                                                    data={book}
                                                    edit
                                                    onSubmit={handleEdit}
                                                />
                                                <DeleteBookButton
                                                    bookId={book._id}
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

const DeleteBookButton = ({ bookId, onDelete }: { bookId: string; onDelete: (id: string) => void }) => {
    const { callApi } = useApiHandler()

    const handleDelete = async () => {
        const responseData = await callApi(() => deleteBook(bookId), () => {
            onDelete(bookId);
        });

        if (responseData) {
            toast.success(responseData.message || "Book deleted successfully");
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
}