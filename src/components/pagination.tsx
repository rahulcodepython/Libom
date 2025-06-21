"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

/**
 * A lightweight, reusable pagination component.
 *
 * • Shows the first, last, current, ±1 pages, and ellipses when appropriate.
 * • Uses shadcn/ui Buttons for consistent styling.
 * • Keyboard-accessible & responsive.
 */
export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
    if (totalPages <= 1) return null

    const goTo = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page)
    }

    const createRange = () => {
        const range: (number | "...")[] = []
        const delta = 1 // how many pages on each side of current

        // always include first & last
        for (let page = 1; page <= totalPages; page++) {
            if (
                page === 1 || // first
                page === totalPages || // last
                (page >= currentPage - delta && page <= currentPage + delta)
            ) {
                range.push(page)
            } else if (range[range.length - 1] !== "...") {
                range.push("...")
            }
        }
        return range
    }

    const pages = createRange()

    return (
        <nav aria-label="Pagination" className={`flex items-center justify-center gap-2 ${className}`}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pages.map((item, idx) =>
                item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground select-none">
                        …
                    </span>
                ) : (
                    <Button
                        key={item}
                        size="sm"
                        variant={item === currentPage ? "default" : "outline"}
                        onClick={() => goTo(item as number)}
                        aria-current={item === currentPage ? "page" : undefined}
                    >
                        {item}
                    </Button>
                ),
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    )
}
