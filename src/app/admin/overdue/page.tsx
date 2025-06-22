// "use client"

import { getBaseUrl } from "@/action"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle } from "lucide-react"

interface RecordType {
    _id: string,
    allotedDate: string,
    submissionDate: string,
    isReturned: boolean,
    usercode: string,
    username: string,
    usermobile: string,
    useremail: string,
    bookisbn: string,
    booktitle: string,
}

// const mockOverdueBooks: OverdueBook[] = [
//     {
//         _id: "1",
//         user_id: "USR003",
//         book_id: "BK003",
//         userName: "Bob Johnson",
//         bookTitle: "1984",
//         allotedDate: "2024-01-05",
//         submissionDate: "2024-01-19",
//         daysOverdue: 3,
//         userPhone: "+1234567892",
//         userEmail: "bob@example.com",
//         fineAmount: 30,
//     },
//     {
//         _id: "2",
//         user_id: "USR009",
//         book_id: "BK009",
//         userName: "Sarah Wilson",
//         bookTitle: "Brave New World",
//         allotedDate: "2024-01-01",
//         submissionDate: "2024-01-15",
//         daysOverdue: 7,
//         userPhone: "+1234567899",
//         userEmail: "sarah@example.com",
//         fineAmount: 70,
//     },
//     {
//         _id: "3",
//         user_id: "USR010",
//         book_id: "BK010",
//         userName: "Tom Davis",
//         bookTitle: "Animal Farm",
//         allotedDate: "2023-12-28",
//         submissionDate: "2024-01-11",
//         daysOverdue: 11,
//         userPhone: "+1234567800",
//         userEmail: "tom@example.com",
//         fineAmount: 110,
//     },
//     {
//         _id: "4",
//         user_id: "USR011",
//         book_id: "BK011",
//         userName: "Lisa Brown",
//         bookTitle: "Fahrenheit 451",
//         allotedDate: "2023-12-25",
//         submissionDate: "2024-01-08",
//         daysOverdue: 14,
//         userPhone: "+1234567801",
//         userEmail: "lisa@example.com",
//         fineAmount: 140,
//     },
// ]

export default async function OverduePage() {
    // const [overdueBooks] = useState<OverdueBook[]>(mockOverdueBooks)
    // const [searchTerm, setSearchTerm] = useState("")
    // const [currentPage, setCurrentPage] = useState(1)
    // const itemsPerPage = 10

    // const filteredBooks = overdueBooks.filter(
    //     (book) =>
    //         book.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         book.user_id.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    // const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
    // const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // const totalFineAmount = overdueBooks.reduce((sum, book) => sum + book.fineAmount, 0)

    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/exceeded-submission`)

    const results: RecordType[] = await response.json()

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
                        {results.length} books are overdue.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Overdue Books</CardTitle>
                    <CardDescription>Books that have exceeded their return deadline</CardDescription>
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
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                results.map((book) => (
                                    <Record key={book._id} submission={book} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

const Record = ({ submission }: { submission: RecordType }) => {
    const allotedDate = new Date(submission.allotedDate)
    const submissionDate = new Date(submission.submissionDate)

    const daysOverdue = Math.ceil((Date.now() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))

    return (
        <TableRow key={submission._id} className="bg-red-50 border-l-4 border-red-500">
            <TableCell className="font-medium">{submission.usercode}</TableCell>
            <TableCell>{submission.username}</TableCell>
            <TableCell>
                <div className="text-sm">
                    <div>{submission.usermobile}</div>
                    <div className="text-muted-foreground">{submission.useremail}</div>
                </div>
            </TableCell>
            <TableCell>{submission.booktitle}</TableCell>
            <TableCell>{new Date(submission.allotedDate).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(submission.submissionDate).toLocaleDateString()}</TableCell>
            <TableCell>
                <span className="text-red-600 font-semibold">
                    {daysOverdue} day{daysOverdue !== 1 ? "s" : ""} overdue
                </span>
            </TableCell>
        </TableRow>
    )
}