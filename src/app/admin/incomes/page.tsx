import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { IncomeType } from "@/types/income.type"
import IncomeList from "./income-list"


export default async function IncomePage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/income`)

    const data: PaginationType<IncomeType> = await response.json()

    return <IncomeList data={data} />
}
