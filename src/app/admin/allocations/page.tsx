"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, AlertTriangle, Clock } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface Allocation {
  _id: string
  user_id: string
  book_id: string
  userName: string
  bookTitle: string
  allotedDate: string
  submissionDate: string
  status: "Active" | "Returned" | "Overdue" | "Near Due"
  daysRemaining: number
}

const mockAllocations: Allocation[] = [
  {
    _id: "1",
    user_id: "USR001",
    book_id: "BK001",
    userName: "John Doe",
    bookTitle: "The Great Gatsby",
    allotedDate: "2024-01-15",
    submissionDate: "2024-01-29",
    status: "Active",
    daysRemaining: 5,
  },
  {
    _id: "2",
    user_id: "USR002",
    book_id: "BK002",
    userName: "Jane Smith",
    bookTitle: "To Kill a Mockingbird",
    allotedDate: "2024-01-10",
    submissionDate: "2024-01-24",
    status: "Near Due",
    daysRemaining: 2,
  },
  {
    _id: "3",
    user_id: "USR003",
    book_id: "BK003",
    userName: "Bob Johnson",
    bookTitle: "1984",
    allotedDate: "2024-01-05",
    submissionDate: "2024-01-19",
    status: "Overdue",
    daysRemaining: -3,
  },
  {
    _id: "4",
    user_id: "USR004",
    book_id: "BK004",
    userName: "Alice Brown",
    bookTitle: "Pride and Prejudice",
    allotedDate: "2024-01-20",
    submissionDate: "2024-02-03",
    status: "Active",
    daysRemaining: 10,
  },
  {
    _id: "5",
    user_id: "USR005",
    book_id: "BK005",
    userName: "Charlie Wilson",
    bookTitle: "The Catcher in the Rye",
    allotedDate: "2024-01-01",
    submissionDate: "2024-01-15",
    status: "Returned",
    daysRemaining: 0,
  },
]

export default function AllocationsPage() {
  const [allocations] = useState<Allocation[]>(mockAllocations)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAllocations = allocations.filter(
    (allocation) =>
      allocation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.user_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredAllocations.length / itemsPerPage)
  const paginatedAllocations = filteredAllocations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (allocation: Allocation) => {
    if (allocation.status === "Overdue") {
      return (
        <Badge variant="destructive" className="bg-red-500">
          Overdue
        </Badge>
      )
    } else if (allocation.status === "Near Due") {
      return (
        <Badge variant="secondary" className="bg-yellow-500 text-white">
          Near Due
        </Badge>
      )
    } else if (allocation.status === "Returned") {
      return <Badge variant="outline">Returned</Badge>
    } else {
      return <Badge variant="default">Active</Badge>
    }
  }

  const getRowClassName = (allocation: Allocation) => {
    if (allocation.status === "Overdue") {
      return "bg-red-50 border-l-4 border-red-500"
    } else if (allocation.status === "Near Due") {
      return "bg-yellow-50 border-l-4 border-yellow-500"
    }
    return ""
  }

  const stats = {
    total: allocations.length,
    active: allocations.filter((a) => a.status === "Active").length,
    nearDue: allocations.filter((a) => a.status === "Near Due").length,
    overdue: allocations.filter((a) => a.status === "Overdue").length,
    returned: allocations.filter((a) => a.status === "Returned").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Book Allocations</h1>
        <p className="text-muted-foreground">Track all book borrowing and returns</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near Due</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.nearDue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returned</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.returned}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Allocations</CardTitle>
          <CardDescription>Complete list of book borrowing records</CardDescription>
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
                <TableHead>Book Title</TableHead>
                <TableHead>Alloted Date</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAllocations.map((allocation) => (
                <TableRow key={allocation._id} className={getRowClassName(allocation)}>
                  <TableCell className="font-medium">{allocation.user_id}</TableCell>
                  <TableCell>{allocation.userName}</TableCell>
                  <TableCell>{allocation.bookTitle}</TableCell>
                  <TableCell>{allocation.allotedDate}</TableCell>
                  <TableCell>{allocation.submissionDate}</TableCell>
                  <TableCell>
                    {allocation.status === "Returned" ? (
                      <span className="text-green-600">Returned</span>
                    ) : allocation.daysRemaining < 0 ? (
                      <span className="text-red-600 font-semibold">
                        {Math.abs(allocation.daysRemaining)} days overdue
                      </span>
                    ) : (
                      <span className={allocation.daysRemaining <= 3 ? "text-yellow-600 font-semibold" : ""}>
                        {allocation.daysRemaining} days left
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(allocation)}</TableCell>
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
