"use client";

import deleteUser from '@/api/delete.user.api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApiHandler } from '@/hooks/useApiHandler';
import usePagination, { PaginationType } from '@/hooks/usePagination';
import { UserType } from '@/types/user.type';
import React from 'react';
import { toast } from 'sonner';
import UserForm from './user-form';

const UserList = ({ data }: { data: PaginationType<UserType> }) => {
    const pagination = usePagination<UserType>(data, 10);

    const [filteredResults, setFilteredResults] = React.useState<UserType[]>(pagination.results);

    React.useEffect(() => {
        setFilteredResults(pagination.results);
    }, [pagination.results]);

    const [searchTerm, setSearchTerm] = React.useState("");

    const handleCreateUser = async (user: UserType) => {
        pagination.addData(user);
    }

    const handleEdit = (user: UserType) => {
        pagination.updateData(user._id, user);
    }

    const handleDelete = (userId: string) => {
        pagination.removeData(userId);
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage library users and their information</p>
                </div>
                <div>
                    <UserForm onSubmit={handleCreateUser} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription className='text-right'>Total users: {pagination.count}</CardDescription>
                    <div className="flex items-center w-full justify-center">
                        <Input
                            type="text"
                            placeholder="Search by name, email, or code"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                const term = e.target.value.toLowerCase();
                                setFilteredResults(pagination.results.filter(user =>
                                    user.name.toLowerCase().includes(term) ||
                                    user.email.toLowerCase().includes(term) ||
                                    user.code.toLowerCase().includes(term)
                                ));
                            }}
                            className="w-[500px]"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredResults.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="font-medium">{user.code}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.mobile}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.active ? "default" : "secondary"}>{user.active ? "Active" : "Inactive"}</Badge>
                                        </TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleDateString("en-GB")}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <UserForm data={user} onSubmit={handleEdit} edit />
                                                <DeleteUserButton userId={user._id} onDelete={handleDelete} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                    <div className="mt-4 flex items-center justify-between">
                        <Button onClick={() => pagination.goToPage(pagination.pageNumber - 1)} disabled={pagination.pageNumber === 1}>
                            Previous
                        </Button>
                        <Button onClick={() => pagination.goToPage(pagination.pageNumber + 1)} disabled={!pagination.isNext}>
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const DeleteUserButton = ({ userId, onDelete }: { userId: string; onDelete: (id: string) => void }) => {
    const { callApi } = useApiHandler()

    const handleDelete = async () => {
        const responseData = await callApi(() => deleteUser(userId), () => {
            onDelete(userId);
        });

        if (responseData) {
            toast.success(responseData.message || "User deleted successfully");
        }
    }
    return (
        <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
}

export default UserList