"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Pagination } from "@/components/pagination"
import Image from "next/image"

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

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    edition: "",
    publisher: "",
    published: "",
    totalBooksAvailable: 0,
    currentlyAvailable: 0,
    category: "",
  })

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBook) {
      setBooks(
        books.map((book) =>
          book._id === editingBook._id ? { ...book, ...formData, image: "/placeholder.svg?height=100&width=80" } : book,
        ),
      )
    } else {
      const newBook: Book = {
        _id: Date.now().toString(),
        ...formData,
        image: "/placeholder.svg?height=100&width=80",
      }
      setBooks([...books, newBook])
    }

    setIsDialogOpen(false)
    setEditingBook(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      edition: "",
      publisher: "",
      published: "",
      totalBooksAvailable: 0,
      currentlyAvailable: 0,
      category: "",
    })
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      edition: book.edition,
      publisher: book.publisher,
      published: book.published,
      totalBooksAvailable: book.totalBooksAvailable,
      currentlyAvailable: book.currentlyAvailable,
      category: book.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (bookId: string) => {
    setBooks(books.filter((book) => book._id !== bookId))
  }

  const openCreateDialog = () => {
    setEditingBook(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Books Management</h1>
          <p className="text-muted-foreground">Manage library books and inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
              <DialogDescription>
                {editingBook ? "Update book information" : "Add a new book to the library"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edition">Edition</Label>
                  <Input
                    id="edition"
                    value={formData.edition}
                    onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="published">Published Year</Label>
                  <Input
                    id="published"
                    value={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="totalBooks">Total Books</Label>
                  <Input
                    id="totalBooks"
                    type="number"
                    value={formData.totalBooksAvailable}
                    onChange={(e) => setFormData({ ...formData, totalBooksAvailable: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currentlyAvailable">Currently Available</Label>
                  <Input
                    id="currentlyAvailable"
                    type="number"
                    value={formData.currentlyAvailable}
                    onChange={(e) => setFormData({ ...formData, currentlyAvailable: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingBook ? "Update Book" : "Add Book"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Books Inventory</CardTitle>
          <CardDescription>Total books: {books.length}</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
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
              {paginatedBooks.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <Image
                      src={book.image || "/placeholder.svg"}
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
                    {book.currentlyAvailable}/{book.totalBooksAvailable}
                  </TableCell>
                  <TableCell>
                    <Badge variant={book.currentlyAvailable > 0 ? "default" : "destructive"}>
                      {book.currentlyAvailable > 0 ? "Available" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(book._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
