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

export default async function OverduePage() {

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
    const submissionDate = new Date(submission.submissionDate)

    const daysOverdue = Math.floor((Date.now() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))

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
            <TableCell>{new Date(submission.submissionDate).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
                <span className="text-red-600 font-semibold">
                    {daysOverdue} day{daysOverdue !== 1 ? "s" : ""} overdue
                </span>
            </TableCell>
        </TableRow>
    )
}