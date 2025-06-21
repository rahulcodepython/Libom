"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, AlertTriangle } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface NearSubmission {
  _id: string
  user_id: string
  book_id: string
  userName: string
  bookTitle: string
  allotedDate: string
  submissionDate: string
  daysRemaining: number
  userPhone: string
  userEmail: string
}

const mockNearSubmissions: NearSubmission[] = [
  {
    _id: "1",
    user_id: "USR002",
    book_id: "BK002",
    userName: "Jane Smith",
    bookTitle: "To Kill a Mockingbird",
    allotedDate: "2024-01-10",
    submissionDate: "2024-01-24",
    daysRemaining: 2,
    userPhone: "+1234567891",
    userEmail: "jane@example.com",
  },
  {
    _id: "2",
    user_id: "USR006",
    book_id: "BK006",
    userName: "David Wilson",
    bookTitle: "The Hobbit",
    allotedDate: "2024-01-12",
    submissionDate: "2024-01-26",
    daysRemaining: 3,
    userPhone: "+1234567896",
    userEmail: "david@example.com",
  },
  {
    _id: "3",
    user_id: "USR007",
    book_id: "BK007",
    userName: "Emma Davis",
    bookTitle: "Harry Potter",
    allotedDate: "2024-01-13",
    submissionDate: "2024-01-27",
    daysRemaining: 1,
    userPhone: "+1234567897",
    userEmail: "emma@example.com",
  },
  {
    _id: "4",
    user_id: "USR008",
    book_id: "BK008",
    userName: "Michael Brown",
    bookTitle: "Lord of the Rings",
    allotedDate: "2024-01-11",
    submissionDate: "2024-01-25",
    daysRemaining: 3,
    userPhone: "+1234567898",
    userEmail: "michael@example.com",
  },
]

export default function NearSubmissionPage() {
  const [submissions] = useState<NearSubmission[]>(mockNearSubmissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.user_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage)
  const paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock className="h-8 w-8 text-yellow-500" />
          Near Submission Books
        </h1>
        <p className="text-muted-foreground">Books that are due for return within 3 days</p>
      </div>

      {/* Alert Card */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Attention Required
          </CardTitle>
          <CardDescription className="text-yellow-700">
            {submissions.length} books are due for return soon. Consider sending reminders to users.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Books Due Soon</CardTitle>
          <CardDescription>Books that need to be returned within the next 3 days</CardDescription>
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
                <TableHead>Alloted Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubmissions.map((submission) => (
                <TableRow key={submission._id} className="bg-yellow-50 border-l-4 border-yellow-500">
                  <TableCell className="font-medium">{submission.user_id}</TableCell>
                  <TableCell>{submission.userName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{submission.userPhone}</div>
                      <div className="text-muted-foreground">{submission.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{submission.bookTitle}</TableCell>
                  <TableCell>{submission.allotedDate}</TableCell>
                  <TableCell>{submission.submissionDate}</TableCell>
                  <TableCell>
                    <span className="text-yellow-600 font-semibold">
                      {submission.daysRemaining} day{submission.daysRemaining !== 1 ? "s" : ""} left
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${
                        submission.daysRemaining === 1 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {submission.daysRemaining === 1 ? "Urgent" : "Medium"}
                    </Badge>
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
