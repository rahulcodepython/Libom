import { routeHandlerWrapper } from "@/action";
import { Book } from "@/models/books.models";

export const GET = routeHandlerWrapper(async (request: Request) => {
    const page = parseInt(new URLSearchParams(new URL(request.url).search).get("page") || "1", 10);
    const limit = parseInt(new URLSearchParams(new URL(request.url).search).get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const books = await Book.find({}, { __v: 0 })
        .sort({ createdAt: -1 })

    const filteredBooks = books.slice(skip, skip + limit);

    return new Response(JSON.stringify({
        count: books.length,
        next: filteredBooks.length > limit ? `/api/book?page=${page + 1}&limit=${limit}` : null,
        results: filteredBooks
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
})

export const POST = routeHandlerWrapper(async (request: Request) => {
    const bookData = await request.json();

    if (!bookData.title || !bookData.author || !bookData.isbn) {
        return new Response(JSON.stringify({ message: "Title, author, and published date are required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const newBook = new Book({
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn || "",
        publisher: bookData.publisher || "",
        image: bookData.image || "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg",
        availableNumber: bookData.availableNumber || 0,
        totalNumber: bookData.totalNumber || 0,
        createdAt: new Date(),
    });
    await newBook.save();

    return new Response(JSON.stringify({
        message: "Book created successfully",
        data: newBook,
    }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
});

export const PATCH = routeHandlerWrapper(async (request: Request) => {
    const bookData = await request.json();
    const { _id, ...updateData } = bookData;

    if (!_id) {
        return new Response(JSON.stringify({ message: "Book ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const updatedBook = await Book.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedBook) {
        return new Response(JSON.stringify({ message: "Book not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({
        message: "Book updated successfully",
        data: updatedBook,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
});