import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { UserType } from "@/types/user.type"
import UserList from "./user-list"

export default async function UsersPage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/user?page=1&limit=10`, {
        cache: "no-store",
    })

    const data: PaginationType<UserType> = await response.json()

    return (
        <UserList data={data} />
    )
}
