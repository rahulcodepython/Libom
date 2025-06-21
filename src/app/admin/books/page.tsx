import { getBaseUrl } from "@/action"
import { PaginationType } from "@/hooks/usePagination"
import { BookType } from "@/types/book.type"
import BooksList from "./books-list"

export default async function BooksPage() {
    const baseurl = await getBaseUrl()

    const response = await fetch(`${baseurl}/api/book`)

    const books: PaginationType<BookType> = await response.json()

    return (
        <BooksList data={books} />
    )
}
