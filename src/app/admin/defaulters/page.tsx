// "use client"


import { getBaseUrl } from "@/action"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign } from "lucide-react"

interface Defaulter {
    _id: string
    usercode: string
    username: string
    booktitle: string
    bookisbn: string
    allotedDate: string
    returnedDate: string
    amount: number
    createdAt: string
}

// const mockDefaulters: Defaulter[] = [
//     {
//         _id: "1",
//         user_id: "USR003",
//         userName: "Bob Johnson",
//         bookTitle: "1984",
//         loanDate: "2024-01-05",
//         submissionDate: "2024-01-22",
//         amount: 150,
//         status: "Pending",
//         createdAt: "2024-01-22",
//     },
//     {
//         _id: "2",
//         user_id: "USR009",
//         userName: "Sarah Wilson",
//         bookTitle: "Brave New World",
//         loanDate: "2024-01-01",
//         submissionDate: "2024-01-20",
//         amount: 200,
//         status: "Paid",
//         createdAt: "2024-01-20",
//     },
//     {
//         _id: "3",
//         user_id: "USR010",
//         userName: "Tom Davis",
//         bookTitle: "Animal Farm",
//         loanDate: "2023-12-28",
//         submissionDate: "2024-01-18",
//         amount: 300,
//         status: "Partial",
//         createdAt: "2024-01-18",
//     },
// ]

export default async function DefaultersPage() {
    // const [defaulters, setDefaulters] = useState<Defaulter[]>(mockDefaulters)
    // const [searchTerm, setSearchTerm] = useState("")
    // const [isDialogOpen, setIsDialogOpen] = useState(false)
    // const [editingDefaulter, setEditingDefaulter] = useState<Defaulter | null>(null)
    // const [currentPage, setCurrentPage] = useState(1)
    // const itemsPerPage = 10

    // const [formData, setFormData] = useState({
    //     user_id: "",
    //     userName: "",
    //     bookTitle: "",
    //     loanDate: "",
    //     amount: 0,
    //     status: "Pending" as "Pending" | "Paid" | "Partial",
    // })

    // const filteredDefaulters = defaulters.filter(
    //     (defaulter) =>
    //         defaulter.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         defaulter.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         defaulter.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    // const totalPages = Math.ceil(filteredDefaulters.length / itemsPerPage)
    // const paginatedDefaulters = filteredDefaulters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()

    //     if (editingDefaulter) {
    //         setDefaulters(
    //             defaulters.map((defaulter) =>
    //                 defaulter._id === editingDefaulter._id
    //                     ? { ...defaulter, ...formData, submissionDate: new Date().toISOString().split("T")[0] }
    //                     : defaulter,
    //             ),
    //         )
    //     } else {
    //         const newDefaulter: Defaulter = {
    //             _id: Date.now().toString(),
    //             ...formData,
    //             submissionDate: new Date().toISOString().split("T")[0],
    //             createdAt: new Date().toISOString().split("T")[0],
    //         }
    //         setDefaulters([...defaulters, newDefaulter])
    //     }

    //     setIsDialogOpen(false)
    //     setEditingDefaulter(null)
    //     resetForm()
    // }

    // const resetForm = () => {
    //     setFormData({
    //         user_id: "",
    //         userName: "",
    //         bookTitle: "",
    //         loanDate: "",
    //         amount: 0,
    //         status: "Pending",
    //     })
    // }

    // const handleEdit = (defaulter: Defaulter) => {
    //     setEditingDefaulter(defaulter)
    //     setFormData({
    //         user_id: defaulter.user_id,
    //         userName: defaulter.userName,
    //         bookTitle: defaulter.bookTitle,
    //         loanDate: defaulter.loanDate,
    //         amount: defaulter.amount,
    //         status: defaulter.status,
    //     })
    //     setIsDialogOpen(true)
    // }

    // const handleDelete = (defaulterId: string) => {
    //     setDefaulters(defaulters.filter((defaulter) => defaulter._id !== defaulterId))
    // }

    // const openCreateDialog = () => {
    //     setEditingDefaulter(null)
    //     resetForm()
    //     setIsDialogOpen(true)
    // }

    // const totalAmount = defaulters.reduce((sum, d) => sum + d.amount, 0)
    // const paidAmount = defaulters.filter((d) => d.status === "Paid").reduce((sum, d) => sum + d.amount, 0)
    // const pendingAmount = defaulters.filter((d) => d.status === "Pending").reduce((sum, d) => sum + d.amount, 0)

    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/defaulters`)

    const defaulters: Defaulter[] = await response.json()

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Defaulters Management</h1>
                    <p className="text-muted-foreground">Track and manage library fine payments</p>
                </div>
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
                        <div className="text-2xl font-bold">₹{20}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Collected</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹{400}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <DollarSign className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">₹{60}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Defaulters Records</CardTitle>
                    <CardDescription>Manage fine payments and defaulter information</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User Code</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Book ISBN</TableHead>
                                <TableHead>Book Title</TableHead>
                                <TableHead>Allotment Date</TableHead>
                                <TableHead>Returned Date</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                defaulters.map((defaulter) => (
                                    <TableRow key={defaulter._id}>
                                        <TableCell className="font-medium">{defaulter.usercode}</TableCell>
                                        <TableCell>{defaulter.username}</TableCell>
                                        <TableCell>{defaulter.bookisbn}</TableCell>
                                        <TableCell>{defaulter.booktitle}</TableCell>
                                        <TableCell>{new Date(defaulter.allotedDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(defaulter.returnedDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-semibold">₹{defaulter.amount}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
