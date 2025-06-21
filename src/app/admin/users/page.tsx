// "use client"


import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { UserType } from "@/types/user.type"
import UserList from "./user-list"

// const mockUsers: User[] = [
//     {
//         _id: "1",
//         code: "USR001",
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "+1234567890",
//         status: "Active",
//         joinDate: "2024-01-15",
//     },
//     {
//         _id: "2",
//         code: "USR002",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         phone: "+1234567891",
//         status: "Active",
//         joinDate: "2024-01-20",
//     },
//     {
//         _id: "3",
//         code: "USR003",
//         name: "Bob Johnson",
//         email: "bob@example.com",
//         phone: "+1234567892",
//         status: "Inactive",
//         joinDate: "2024-02-01",
//     },
//     {
//         _id: "4",
//         code: "USR004",
//         name: "Alice Brown",
//         email: "alice@example.com",
//         phone: "+1234567893",
//         status: "Active",
//         joinDate: "2024-02-10",
//     },
//     {
//         _id: "5",
//         code: "USR005",
//         name: "Charlie Wilson",
//         email: "charlie@example.com",
//         phone: "+1234567894",
//         status: "Active",
//         joinDate: "2024-02-15",
//     },
// ]

export default async function UsersPage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/user?page=1&limit=10`, {
        cache: "no-store",
    })

    const data: PaginationType<UserType> = await response.json()
    // const [users, setUsers] = useState<UserType[] | null>(null)
    // const [searchTerm, setSearchTerm] = useState("")
    // const [isDialogOpen, setIsDialogOpen] = useState(false)
    // const [editingUser, setEditingUser] = useState<UserType | null>(null)
    // const [currentPage, setCurrentPage] = useState(1)
    // const itemsPerPage = 10

    // const [formData, setFormData] = useState({
    //     code: "",
    //     name: "",
    //     email: "",
    //     phone: "",
    // })

    // const filteredUsers = users.filter(
    //     (user) =>
    //         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         user.code.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    // const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
    // const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()

    //     if (editingUser) {
    //         // Update existing user
    //         setUsers(users.map((user) => (user._id === editingUser._id ? { ...user, ...formData } : user)))
    //     } else {
    //         // Create new user
    //         const newUser: User = {
    //             _id: Date.now().toString(),
    //             ...formData,
    //             status: "Active",
    //             joinDate: new Date().toISOString().split("T")[0],
    //         }
    //         setUsers([...users, newUser])
    //     }

    //     setIsDialogOpen(false)
    //     setEditingUser(null)
    //     setFormData({ code: "", name: "", email: "", phone: "" })
    // }

    // const handleEdit = (user: User) => {
    //     setEditingUser(user)
    //     setFormData({
    //         code: user.code,
    //         name: user.name,
    //         email: user.email,
    //         phone: user.phone,
    //     })
    //     setIsDialogOpen(true)
    // }

    // const handleDelete = (userId: string) => {
    //     setUsers(users.filter((user) => user._id !== userId))
    // }

    // const openCreateDialog = () => {
    //     setEditingUser(null)
    //     setFormData({ code: "", name: "", email: "", phone: "" })
    //     setIsDialogOpen(true)
    // }

    return (
        // <div className="p-6 space-y-6">
        //     <div className="flex items-center justify-between">
        //         <div>
        //             <h1 className="text-3xl font-bold">User Management</h1>
        //             <p className="text-muted-foreground">Manage library users and their information</p>
        //         </div>
        //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        //             <DialogTrigger asChild>
        //                 <Button onClick={openCreateDialog}>
        //                     <Plus className="h-4 w-4 mr-2" />
        //                     Add User
        //                 </Button>
        //             </DialogTrigger>
        //             <DialogContent>
        //                 <DialogHeader>
        //                     <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        //                     <DialogDescription>
        //                         {editingUser ? "Update user information" : "Create a new library user account"}
        //                     </DialogDescription>
        //                 </DialogHeader>
        //                 <form onSubmit={handleSubmit}>
        //                     <div className="space-y-4">
        //                         <div>
        //                             <Label htmlFor="code">User Code</Label>
        //                             <Input
        //                                 id="code"
        //                                 value={formData.code}
        //                                 onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        //                                 placeholder="USR001"
        //                                 required
        //                             />
        //                         </div>
        //                         <div>
        //                             <Label htmlFor="name">Full Name</Label>
        //                             <Input
        //                                 id="name"
        //                                 value={formData.name}
        //                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        //                                 placeholder="John Doe"
        //                                 required
        //                             />
        //                         </div>
        //                         <div>
        //                             <Label htmlFor="email">Email</Label>
        //                             <Input
        //                                 id="email"
        //                                 type="email"
        //                                 value={formData.email}
        //                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //                                 placeholder="john@example.com"
        //                                 required
        //                             />
        //                         </div>
        //                         <div>
        //                             <Label htmlFor="phone">Phone</Label>
        //                             <Input
        //                                 id="phone"
        //                                 value={formData.phone}
        //                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        //                                 placeholder="+1234567890"
        //                                 required
        //                             />
        //                         </div>
        //                     </div>
        //                     <DialogFooter className="mt-6">
        //                         <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
        //                             Cancel
        //                         </Button>
        //                         <Button type="submit">{editingUser ? "Update User" : "Create User"}</Button>
        //                     </DialogFooter>
        //                 </form>
        //             </DialogContent>
        //         </Dialog>
        //     </div>

        //     <Card>
        //         <CardHeader>
        //             <CardTitle>Users</CardTitle>
        //             <CardDescription>Total users: {users.length}</CardDescription>
        //             <div className="flex items-center space-x-2">
        //                 <Search className="h-4 w-4 text-muted-foreground" />
        //                 <Input
        //                     placeholder="Search users..."
        //                     value={searchTerm}
        //                     onChange={(e) => setSearchTerm(e.target.value)}
        //                     className="max-w-sm"
        //                 />
        //             </div>
        //         </CardHeader>
        //         <CardContent>
        //             <Table>
        //                 <TableHeader>
        //                     <TableRow>
        //                         <TableHead>Code</TableHead>
        //                         <TableHead>Name</TableHead>
        //                         <TableHead>Email</TableHead>
        //                         <TableHead>Phone</TableHead>
        //                         <TableHead>Status</TableHead>
        //                         <TableHead>Join Date</TableHead>
        //                         <TableHead>Actions</TableHead>
        //                     </TableRow>
        //                 </TableHeader>
        //                 <TableBody>
        //                     {paginatedUsers.map((user) => (
        //                         <TableRow key={user._id}>
        //                             <TableCell className="font-medium">{user.code}</TableCell>
        //                             <TableCell>{user.name}</TableCell>
        //                             <TableCell>{user.email}</TableCell>
        //                             <TableCell>{user.phone}</TableCell>
        //                             <TableCell>
        //                                 <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
        //                             </TableCell>
        //                             <TableCell>{user.joinDate}</TableCell>
        //                             <TableCell>
        //                                 <div className="flex items-center space-x-2">
        //                                     <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
        //                                         <Edit className="h-4 w-4" />
        //                                     </Button>
        //                                     <Button variant="outline" size="sm" onClick={() => handleDelete(user._id)}>
        //                                         <Trash2 className="h-4 w-4" />
        //                                     </Button>
        //                                 </div>
        //                             </TableCell>
        //                         </TableRow>
        //                     ))}
        //                 </TableBody>
        //             </Table>

        //             {totalPages > 1 && (
        //                 <div className="mt-4">
        //                     <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        //                 </div>
        //             )}
        //         </CardContent>
        //     </Card>
        // </div>
        <UserList data={data} />
    )
}
