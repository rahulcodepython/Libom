"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Phone, Mail } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface OverdueBook {
  _id: string
  user_id: string
  book_id: string
  userName: string
  bookTitle: string
  allotedDate: string
  submissionDate: string
  daysOverdue: number
  userPhone: string
  userEmail: string
  fineAmount: number
}

const mockOverdueBooks: OverdueBook[] = [
  {
    _id: "1",
    user_id: "USR003",
    book_id: "BK003",
    userName: "Bob Johnson",
    bookTitle: "1984",
    allotedDate: "2024-01-05",
    submissionDate: "2024-01-19",
    daysOverdue: 3,
    userPhone: "+1234567892",
    userEmail: "bob@example.com",
    fineAmount: 30,
  },
  {
    _id: "2",
    user_id: "USR009",
    book_id: "BK009",
    userName: "Sarah Wilson",
    bookTitle: "Brave New World",
    allotedDate: "2024-01-01",
    submissionDate: "2024-01-15",
    daysOverdue: 7,
    userPhone: "+1234567899",
    userEmail: "sarah@example.com",
    fineAmount: 70,
  },
  {
    _id: "3",
    user_id: "USR010",
    book_id: "BK010",
    userName: "Tom Davis",
    bookTitle: "Animal Farm",
    allotedDate: "2023-12-28",
    submissionDate: "2024-01-11",
    daysOverdue: 11,
    userPhone: "+1234567800",
    userEmail: "tom@example.com",
    fineAmount: 110,
  },
  {
    _id: "4",
    user_id: "USR011",
    book_id: "BK011",
    userName: "Lisa Brown",
    bookTitle: "Fahrenheit 451",
    allotedDate: "2023-12-25",
    submissionDate: "2024-01-08",
    daysOverdue: 14,
    userPhone: "+1234567801",
    userEmail: "lisa@example.com",
    fineAmount: 140,
  },
]

export default function OverduePage() {
  const [overdueBooks] = useState<OverdueBook[]>(mockOverdueBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredBooks = overdueBooks.filter(
    (book) =>
      book.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.user_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalFineAmount = overdueBooks.reduce((sum, book) => sum + book.fineAmount, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          Overdue Books
        </h1>
        <p className="text-muted-foreground">Books that have exceeded their return date</p>
      </div>

      {/* Alert Card */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Critical Attention Required
          </CardTitle>
          <CardDescription className="text-red-700">
            {overdueBooks.length} books are overdue. Total pending fines: ₹{totalFineAmount}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overdue Books</CardTitle>
          <CardDescription>Books that have exceeded their return deadline</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or book..."
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
                <TableHead>User ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Fine Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBooks.map((book) => (
                <TableRow key={book._id} className="bg-red-50 border-l-4 border-red-500">
                  <TableCell className="font-medium">{book.user_id}</TableCell>
                  <TableCell>{book.userName}</TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {book.userPhone}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {book.userEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>{book.submissionDate}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{book.daysOverdue} days overdue</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-red-600">₹{book.fineAmount}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        Call User
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
