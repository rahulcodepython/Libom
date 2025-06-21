"use client"

import type React from "react"

import { Pagination } from "@/components/pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

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
    description: string
}

const mockBooks: Book[] = [
    {
        _id: "1",
        title: "The Great Gatsby",
        image: "/placeholder.svg?height=200&width=150",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        edition: "1st",
        publisher: "Scribner",
        published: "1925",
        totalBooksAvailable: 10,
        currentlyAvailable: 7,
        category: "Fiction",
        description: "A classic American novel set in the Jazz Age",
    },
    {
        _id: "2",
        title: "To Kill a Mockingbird",
        image: "/placeholder.svg?height=200&width=150",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        edition: "1st",
        publisher: "J.B. Lippincott & Co.",
        published: "1960",
        totalBooksAvailable: 8,
        currentlyAvailable: 5,
        category: "Fiction",
        description: "A gripping tale of racial injustice and childhood innocence",
    },
    {
        _id: "3",
        title: "1984",
        image: "/placeholder.svg?height=200&width=150",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        edition: "1st",
        publisher: "Secker & Warburg",
        published: "1949",
        totalBooksAvailable: 12,
        currentlyAvailable: 8,
        category: "Dystopian Fiction",
        description: "A dystopian social science fiction novel",
    },
    {
        _id: "4",
        title: "Pride and Prejudice",
        image: "/placeholder.svg?height=200&width=150",
        author: "Jane Austen",
        isbn: "978-0-14-143951-8",
        edition: "1st",
        publisher: "T. Egerton",
        published: "1813",
        totalBooksAvailable: 6,
        currentlyAvailable: 4,
        category: "Romance",
        description: "A romantic novel of manners",
    },
    {
        _id: "5",
        title: "The Catcher in the Rye",
        image: "/placeholder.svg?height=200&width=150",
        author: "J.D. Salinger",
        isbn: "978-0-316-76948-0",
        edition: "1st",
        publisher: "Little, Brown and Company",
        published: "1951",
        totalBooksAvailable: 5,
        currentlyAvailable: 2,
        category: "Fiction",
        description: "A controversial novel about teenage rebellion",
    },
    {
        _id: "6",
        title: "Harry Potter and the Philosopher's Stone",
        image: "/placeholder.svg?height=200&width=150",
        author: "J.K. Rowling",
        isbn: "978-0-7475-3269-9",
        edition: "1st",
        publisher: "Bloomsbury",
        published: "1997",
        totalBooksAvailable: 15,
        currentlyAvailable: 0,
        category: "Fantasy",
        description: "The first book in the Harry Potter series",
    },
]

export default function SearchPage() {
    const [books] = useState<Book[]>(mockBooks)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchType, setSearchType] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filteredBooks = books.filter((book) => {
        const searchLower = searchTerm.toLowerCase()

        switch (searchType) {
            case "title":
                return book.title.toLowerCase().includes(searchLower)
            case "author":
                return book.author.toLowerCase().includes(searchLower)
            case "isbn":
                return book.isbn.toLowerCase().includes(searchLower)
            default:
                return (
                    book.title.toLowerCase().includes(searchLower) ||
                    book.author.toLowerCase().includes(searchLower) ||
                    book.isbn.toLowerCase().includes(searchLower) ||
                    book.category.toLowerCase().includes(searchLower)
                )
        }
    })

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
    const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1)
    }

    return (
        <section className="p-6 space-y-6">
            {/* Search Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Search Books
                    </CardTitle>
                    <CardDescription>Search by title, author, ISBN, or browse all books</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Enter search term..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-48">
                                <select
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="all">All Fields</option>
                                    <option value="title">Title</option>
                                    <option value="author">Author</option>
                                    <option value="isbn">ISBN</option>
                                </select>
                            </div>
                            <Button type="submit">
                                <Search className="h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Search Results */}
            <Card>
                <CardHeader>
                    <CardTitle>Search Results</CardTitle>
                    <CardDescription>
                        {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
                        {searchTerm && ` for "${searchTerm}"`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        filteredBooks.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No books found</h3>
                                <p className="text-muted-foreground">Try adjusting your search terms or browse all books</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        paginatedBooks.map((book) => (
                                            <div key={book._id} className="hover:shadow-md transition-shadow p-0 gap-0 rounded-md border">
                                                <div className="grid grid-cols-12">
                                                    <div className="col-span-4">
                                                        <Image
                                                            src={book.image || "/placeholder.svg"}
                                                            alt={book.title}
                                                            width={80}
                                                            height={120}
                                                            className="rounded object-cover flex-shrink-0 w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="p-4 col-span-8">
                                                        <h3 className="font-semibold text-lg mb-1 truncate">{book.title}</h3>
                                                        <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                                                        <div className="space-y-1 text-xs text-muted-foreground">
                                                            <p>ISBN: {book.isbn}</p>
                                                            <p>Publisher: {book.publisher}</p>
                                                            <p>Published: {book.published}</p>
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <Badge variant="outline">{book.category}</Badge>
                                                            <div className="text-right">
                                                                <p className="text-sm font-medium">
                                                                    {book.currentlyAvailable}/{book.totalBooksAvailable} available
                                                                </p>
                                                                <Badge
                                                                    variant={book.currentlyAvailable > 0 ? "default" : "destructive"}
                                                                    className="text-xs"
                                                                >
                                                                    {book.currentlyAvailable > 0 ? "Available" : "Out of Stock"}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                {
                                    totalPages > 1 && (
                                        <div className="mt-6">
                                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </CardContent>
            </Card>
        </section>
    )
}
