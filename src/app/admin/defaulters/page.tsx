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
import { Plus, Search, Edit, Trash2, DollarSign } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface Defaulter {
  _id: string
  user_id: string
  userName: string
  bookTitle: string
  loanDate: string
  submissionDate: string
  amount: number
  status: "Pending" | "Paid" | "Partial"
  createdAt: string
}

const mockDefaulters: Defaulter[] = [
  {
    _id: "1",
    user_id: "USR003",
    userName: "Bob Johnson",
    bookTitle: "1984",
    loanDate: "2024-01-05",
    submissionDate: "2024-01-22",
    amount: 150,
    status: "Pending",
    createdAt: "2024-01-22",
  },
  {
    _id: "2",
    user_id: "USR009",
    userName: "Sarah Wilson",
    bookTitle: "Brave New World",
    loanDate: "2024-01-01",
    submissionDate: "2024-01-20",
    amount: 200,
    status: "Paid",
    createdAt: "2024-01-20",
  },
  {
    _id: "3",
    user_id: "USR010",
    userName: "Tom Davis",
    bookTitle: "Animal Farm",
    loanDate: "2023-12-28",
    submissionDate: "2024-01-18",
    amount: 300,
    status: "Partial",
    createdAt: "2024-01-18",
  },
]

export default function DefaultersPage() {
  const [defaulters, setDefaulters] = useState<Defaulter[]>(mockDefaulters)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDefaulter, setEditingDefaulter] = useState<Defaulter | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState({
    user_id: "",
    userName: "",
    bookTitle: "",
    loanDate: "",
    amount: 0,
    status: "Pending" as "Pending" | "Paid" | "Partial",
  })

  const filteredDefaulters = defaulters.filter(
    (defaulter) =>
      defaulter.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredDefaulters.length / itemsPerPage)
  const paginatedDefaulters = filteredDefaulters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDefaulter) {
      setDefaulters(
        defaulters.map((defaulter) =>
          defaulter._id === editingDefaulter._id
            ? { ...defaulter, ...formData, submissionDate: new Date().toISOString().split("T")[0] }
            : defaulter,
        ),
      )
    } else {
      const newDefaulter: Defaulter = {
        _id: Date.now().toString(),
        ...formData,
        submissionDate: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDefaulters([...defaulters, newDefaulter])
    }

    setIsDialogOpen(false)
    setEditingDefaulter(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      user_id: "",
      userName: "",
      bookTitle: "",
      loanDate: "",
      amount: 0,
      status: "Pending",
    })
  }

  const handleEdit = (defaulter: Defaulter) => {
    setEditingDefaulter(defaulter)
    setFormData({
      user_id: defaulter.user_id,
      userName: defaulter.userName,
      bookTitle: defaulter.bookTitle,
      loanDate: defaulter.loanDate,
      amount: defaulter.amount,
      status: defaulter.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (defaulterId: string) => {
    setDefaulters(defaulters.filter((defaulter) => defaulter._id !== defaulterId))
  }

  const openCreateDialog = () => {
    setEditingDefaulter(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const totalAmount = defaulters.reduce((sum, d) => sum + d.amount, 0)
  const paidAmount = defaulters.filter((d) => d.status === "Paid").reduce((sum, d) => sum + d.amount, 0)
  const pendingAmount = defaulters.filter((d) => d.status === "Pending").reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Defaulters Management</h1>
          <p className="text-muted-foreground">Track and manage library fine payments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Defaulter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDefaulter ? "Edit Defaulter" : "Add New Defaulter"}</DialogTitle>
              <DialogDescription>
                {editingDefaulter ? "Update defaulter information" : "Record a new fine payment"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user_id">User ID</Label>
                  <Input
                    id="user_id"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    placeholder="USR001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bookTitle">Book Title</Label>
                  <Input
                    id="bookTitle"
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    placeholder="Book title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="loanDate">Loan Date</Label>
                  <Input
                    id="loanDate"
                    type="date"
                    value={formData.loanDate}
                    onChange={(e) => setFormData({ ...formData, loanDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Fine Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Payment Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "Pending" | "Paid" | "Partial" })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingDefaulter ? "Update" : "Add Defaulter"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Defaulters</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{defaulters.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{paidAmount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{pendingAmount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Defaulters Records</CardTitle>
          <CardDescription>Manage fine payments and defaulter information</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search defaulters..."
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
                <TableHead>Loan Date</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDefaulters.map((defaulter) => (
                <TableRow key={defaulter._id}>
                  <TableCell className="font-medium">{defaulter.user_id}</TableCell>
                  <TableCell>{defaulter.userName}</TableCell>
                  <TableCell>{defaulter.bookTitle}</TableCell>
                  <TableCell>{defaulter.loanDate}</TableCell>
                  <TableCell>{defaulter.submissionDate}</TableCell>
                  <TableCell className="font-semibold">₹{defaulter.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        defaulter.status === "Paid"
                          ? "default"
                          : defaulter.status === "Partial"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {defaulter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(defaulter)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(defaulter._id)}>
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
