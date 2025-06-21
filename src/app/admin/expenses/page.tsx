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
import { Plus, Search, Edit, Trash2, TrendingDown } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface Expense {
  _id: string
  amount: number
  createdAt: string
  reason: string
  category: string
}

const mockExpenses: Expense[] = [
  {
    _id: "1",
    amount: 2500,
    createdAt: "2024-01-22",
    reason: "New books purchase - Fiction collection",
    category: "Books",
  },
  {
    _id: "2",
    amount: 800,
    createdAt: "2024-01-21",
    reason: "Monthly electricity bill",
    category: "Utilities",
  },
  {
    _id: "3",
    amount: 1200,
    createdAt: "2024-01-20",
    reason: "Staff salary - January",
    category: "Salary",
  },
  {
    _id: "4",
    amount: 450,
    createdAt: "2024-01-19",
    reason: "Office supplies and stationery",
    category: "Supplies",
  },
  {
    _id: "5",
    amount: 3000,
    createdAt: "2024-01-18",
    reason: "Computer system maintenance",
    category: "Maintenance",
  },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState({
    amount: 0,
    reason: "",
    category: "",
  })

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage)
  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingExpense) {
      setExpenses(
        expenses.map((expense) => (expense._id === editingExpense._id ? { ...expense, ...formData } : expense)),
      )
    } else {
      const newExpense: Expense = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setExpenses([...expenses, newExpense])
    }

    setIsDialogOpen(false)
    setEditingExpense(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      amount: 0,
      reason: "",
      category: "",
    })
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setFormData({
      amount: expense.amount,
      reason: expense.reason,
      category: expense.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (expenseId: string) => {
    setExpenses(expenses.filter((expense) => expense._id !== expenseId))
  }

  const openCreateDialog = () => {
    setEditingExpense(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const thisMonthExpense = expenses
    .filter((expense) => new Date(expense.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expense Records</h1>
          <p className="text-muted-foreground">Track all library expenses and costs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingExpense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
              <DialogDescription>
                {editingExpense ? "Update expense record" : "Record a new expense entry"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
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
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Books">Books</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Salary">Salary</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Rent">Rent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reason">Reason/Description</Label>
                  <Input
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Description of expense"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalExpense}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{thisMonthExpense}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
          <CardDescription>All expense transactions and cost records</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expense records..."
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
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExpenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense.createdAt}</TableCell>
                  <TableCell className="font-semibold text-red-600">₹{expense.amount}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{expense.category}</span>
                  </TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(expense)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(expense._id)}>
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
