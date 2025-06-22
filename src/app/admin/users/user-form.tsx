import createUsers from '@/api/create.user.api'
import editUsers from '@/api/edit.user.api'
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useApiHandler } from '@/hooks/useApiHandler'
import { UserType } from '@/types/user.type'
import { Edit, Plus } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const UserForm = ({
    edit = false,
    data,
    onSubmit
}: {
    edit?: boolean
    data?: UserType
    onSubmit: (data: UserType) => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [formData, setFormData] = React.useState<UserType>({
        _id: '',
        code: '',
        name: '',
        email: '',
        mobile: '',
        active: true,
        createdAt: new Date(), // Ensure createdAt is always a string
    })

    const { isLoading, callApi } = useApiHandler()

    const handleSubmit = async () => {
        const responseData = await callApi(() => edit ? editUsers(formData) : createUsers(formData), () => {
            !edit && setFormData({
                _id: '',
                code: '',
                name: '',
                email: '',
                mobile: '',
                active: true,
                createdAt: new Date(), // Ensure createdAt is always a string
            })
        })

        if (responseData) {
            toast.success(responseData.message || (edit ? "User updated successfully" : "User created successfully"))
            onSubmit(responseData.data)
            setIsDialogOpen(false)
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {
                    edit ? <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                    </Button> : <Button>
                        <Plus className="h-4 w-4" />
                        Add User
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{edit ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        {edit ? "Update user information" : "Create a new library user account"}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="code">User Code</Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="USR001"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                placeholder="+1234567890"
                                required
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Label htmlFor="active">Active</Label>
                            <Switch
                                id="active"
                                checked={formData.active}
                                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>
                            <Button type="submit" onClick={handleSubmit}>{edit ? "Update User" : "Create User"}</Button>
                        </LoadingButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserForm