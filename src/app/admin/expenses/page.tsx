import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { ExpenseType } from "@/types/expense.type"
import ExpenseList from "./expense-list"

export default async function ExpensePage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/expense`)

    const data: PaginationType<ExpenseType> = await response.json()

    return <ExpenseList data={data} />
}
