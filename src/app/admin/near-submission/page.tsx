import { getBaseUrl } from "@/action"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Clock } from "lucide-react"

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

export default async function NearSubmissionPage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/near-submission`)

    const results: RecordType[] = await response.json()

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
                        {results.length} books are due for return soon. Consider sending reminders to users.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Books Due Soon</CardTitle>
                    <CardDescription>Books that need to be returned within the next 5 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User Code</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Book Title</TableHead>
                                <TableHead>Alloted Date</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Days Left</TableHead>
                                <TableHead>Priority</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                results.map((submission) => (
                                    <Record key={submission._id} submission={submission} />
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

    const daysRemaining = Math.ceil((submissionDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    return <TableRow key={submission._id} className="bg-yellow-50 border-l-4 border-yellow-500">
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
            <span className="text-yellow-600 font-semibold">
                {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
            </span>
        </TableCell>
        <TableCell>
            <Badge
                variant="secondary"
                className={`${daysRemaining === 1 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}
            >
                {daysRemaining === 1 ? "Urgent" : "Medium"}
            </Badge>
        </TableCell>
    </TableRow>
}