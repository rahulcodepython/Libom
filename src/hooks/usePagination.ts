"use client";
import React from "react";

export interface PaginationType<T> {
    count: number,
    next: string,
    results: T[]
}

const usePagination = <T>(data: PaginationType<T>, defaultPageSize: number = 5) => {
    const [results, setResults] = React.useState<T[]>(data.results);
    const [nextPageUrl, setNextPageUrl] = React.useState(data.next);
    const [count, setCount] = React.useState(data.count);
    const [isNext, setIsNext] = React.useState(nextPageUrl !== null);
    const [isFetching, setIsFetching] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(defaultPageSize);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [loadedPages, setLoadedPages] = React.useState<{ [key: number]: T[] }>({ 1: data.results });

    // Calculate total pages needed
    const totalPages = Math.ceil(count / pageSize);

    const fetchNext = async (url: string, page: number) => {
        setIsFetching(true);
        try {
            const response = await fetch(url);
            const data: PaginationType<T> = await response.json();

            setLoadedPages((prevPages) => ({
                ...prevPages,
                [page]: data.results,
            }));
            setResults(data.results);
            setNextPageUrl(data.next);
            setCount(data.count);
            setIsNext(data.next !== null);
        } catch (error) {
            console.error("Failed to fetch next page:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const loadMore = async (url: string) => {
        setIsFetching(true);
        try {
            const response = await fetch(url);
            const data: PaginationType<T> = await response.json();

            setResults([...results, ...data.results]);
            setNextPageUrl(data.next);
            setCount(data.count);
            setIsNext(data.next !== null);
        } catch (error) {
            console.error("Failed to fetch next page:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const goToPage = async (page: number) => {
        if (page < 1 || page > totalPages) return; // Prevent navigating out of bounds
        setPageNumber(page);

        // Check if the page is already loaded
        if (loadedPages[page]) {
            setResults(loadedPages[page]);
        } else if (nextPageUrl && isNext) {
            // If the page isn't loaded and `nextPageUrl` exists, fetch data
            await fetchNext(nextPageUrl, page);
        }
    };

    const addData = (data: T) => {
        const updatedPages = { ...loadedPages };
        const pageSizeLimit = pageSize;

        // Add new data to the first page and shift the rest
        const updatedFirstPage = [data, ...updatedPages[1]].slice(0, pageSizeLimit);
        updatedPages[1] = updatedFirstPage;

        // Reassign shifted data to subsequent pages if needed
        let carryOver = updatedPages[1].slice(pageSizeLimit);
        for (let page = 2; page <= totalPages; page++) {
            if (!carryOver.length) break;
            const currentPage = updatedPages[page] || [];
            updatedPages[page] = [...carryOver, ...currentPage].slice(0, pageSizeLimit);
            carryOver = [...currentPage, ...carryOver].slice(pageSizeLimit);
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber]);
        setCount((prevCount: number) => prevCount + 1);
    };


    const removeData = (id: string) => {
        const updatedPages = { ...loadedPages };
        const pageSizeLimit = pageSize;

        // Remove the data from the pages
        let carryOver: T[] = [];
        for (let page = 1; page <= totalPages; page++) {
            const currentPage = (updatedPages[page] || []).filter((data: any) => data._id !== id);
            updatedPages[page] = [...currentPage, ...carryOver].slice(0, pageSizeLimit);
            carryOver = currentPage.slice(pageSizeLimit);
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber] || []);
        setCount((prevCount: number) => prevCount - 1);
    };


    const updateData = (id: string, changedData: Partial<T>) => {
        const updatedPages = { ...loadedPages };

        for (let page = 1; page <= totalPages; page++) {
            const pageIndex = updatedPages[page]?.findIndex((data: any) => data._id === id);
            if (pageIndex !== undefined && pageIndex !== -1) {
                const existingData = updatedPages[page][pageIndex];
                updatedPages[page][pageIndex] = { ...existingData, ...changedData }; // Merge updated values
                break;
            }
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber] || []);
    };

    return {
        results,
        nextPageUrl,
        count,
        isNext,
        fetchNext,
        loadMore,
        isFetching,
        addData,
        removeData,
        updateData,
        pageSize,
        totalPages,
        pageNumber,
        goToPage,
    };
};

export default usePagination;