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
import { Plus, Search, Edit, Trash2, TrendingUp } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface Income {
  _id: string
  amount: number
  createdAt: string
  reason: string
  category: string
}

const mockIncomes: Income[] = [
  {
    _id: "1",
    amount: 500,
    createdAt: "2024-01-22",
    reason: "Late return fine - John Doe",
    category: "Fine",
  },
  {
    _id: "2",
    amount: 1200,
    createdAt: "2024-01-21",
    reason: "Monthly membership fees",
    category: "Membership",
  },
  {
    _id: "3",
    amount: 300,
    createdAt: "2024-01-20",
    reason: "Book damage compensation",
    category: "Compensation",
  },
  {
    _id: "4",
    amount: 800,
    createdAt: "2024-01-19",
    reason: "Late return fine - Multiple users",
    category: "Fine",
  },
  {
    _id: "5",
    amount: 2000,
    createdAt: "2024-01-18",
    reason: "Annual membership renewal",
    category: "Membership",
  },
]

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>(mockIncomes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState({
    amount: 0,
    reason: "",
    category: "",
  })

  const filteredIncomes = incomes.filter(
    (income) =>
      income.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage)
  const paginatedIncomes = filteredIncomes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingIncome) {
      setIncomes(incomes.map((income) => (income._id === editingIncome._id ? { ...income, ...formData } : income)))
    } else {
      const newIncome: Income = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setIncomes([...incomes, newIncome])
    }

    setIsDialogOpen(false)
    setEditingIncome(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      amount: 0,
      reason: "",
      category: "",
    })
  }

  const handleEdit = (income: Income) => {
    setEditingIncome(income)
    setFormData({
      amount: income.amount,
      reason: income.reason,
      category: income.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (incomeId: string) => {
    setIncomes(incomes.filter((income) => income._id !== incomeId))
  }

  const openCreateDialog = () => {
    setEditingIncome(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const thisMonthIncome = incomes
    .filter((income) => new Date(income.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, income) => sum + income.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Income Records</h1>
          <p className="text-muted-foreground">Track all library income and revenue</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingIncome ? "Edit Income" : "Add New Income"}</DialogTitle>
              <DialogDescription>
                {editingIncome ? "Update income record" : "Record a new income entry"}
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
                    <option value="Fine">Fine</option>
                    <option value="Membership">Membership</option>
                    <option value="Compensation">Compensation</option>
                    <option value="Donation">Donation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reason">Reason/Description</Label>
                  <Input
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Description of income source"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingIncome ? "Update Income" : "Add Income"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalIncome}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹{thisMonthIncome}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incomes.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Records</CardTitle>
          <CardDescription>All income transactions and revenue sources</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search income records..."
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
              {paginatedIncomes.map((income) => (
                <TableRow key={income._id}>
                  <TableCell>{income.createdAt}</TableCell>
                  <TableCell className="font-semibold text-green-600">₹{income.amount}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{income.category}</span>
                  </TableCell>
                  <TableCell>{income.reason}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(income)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(income._id)}>
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
