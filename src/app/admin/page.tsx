"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, TrendingUp, DollarSign, AlertTriangle, Clock, ShoppingCart } from "lucide-react"

const stats = [
  {
    title: "Books Borrowed Today",
    value: "23",
    icon: BookOpen,
    description: "↗️ 12% from yesterday",
  },
  {
    title: "Books to Return Today",
    value: "18",
    icon: Calendar,
    description: "Due today",
  },
  {
    title: "Total Customers",
    value: "2,547",
    icon: Users,
    description: "↗️ 5% from last month",
  },
  {
    title: "Avg Books per Customer",
    value: "3.2",
    icon: TrendingUp,
    description: "Monthly average",
  },
  {
    title: "This Week Borrowed",
    value: "156",
    icon: Clock,
    description: "↗️ 8% from last week",
  },
  {
    title: "This Month Borrowed",
    value: "642",
    icon: Calendar,
    description: "↗️ 15% from last month",
  },
  {
    title: "Total Expenses",
    value: "₹45,230",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Defaulter Earnings",
    value: "₹12,450",
    icon: AlertTriangle,
    description: "Late fees collected",
  },
]

const borrowedBooks = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", count: 5 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", count: 4 },
  { title: "1984", author: "George Orwell", count: 6 },
  { title: "Pride and Prejudice", author: "Jane Austen", count: 3 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", count: 2 },
]

const booksToPurchase = [
  { title: "Atomic Habits", author: "James Clear", priority: "High", reason: "High demand" },
  { title: "Sapiens", author: "Yuval Noah Harari", priority: "Medium", reason: "Popular request" },
  { title: "The Psychology of Money", author: "Morgan Housel", priority: "High", reason: "Waitlist: 15" },
  { title: "Educated", author: "Tara Westover", priority: "Low", reason: "Occasional request" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Libom Library Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Borrowed Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Most Borrowed Books
            </CardTitle>
            <CardDescription>Books currently borrowed by users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {borrowedBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>
                  <Badge variant="secondary">{book.count} copies</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Books to Purchase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Books to Purchase
            </CardTitle>
            <CardDescription>Recommended books for library acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {booksToPurchase.map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="text-xs text-muted-foreground">{book.reason}</p>
                  </div>
                  <Badge
                    variant={
                      book.priority === "High" ? "destructive" : book.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {book.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
