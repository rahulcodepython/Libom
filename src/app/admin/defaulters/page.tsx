import { getBaseUrl } from "@/action"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export default async function DefaultersPage() {

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
