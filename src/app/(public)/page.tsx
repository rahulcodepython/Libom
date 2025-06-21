import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Romance",
    "Mystery",
    "Fantasy",
    "Self-Help",
]

const popularBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction" },
    { title: "1984", author: "George Orwell", category: "Fiction" },
    { title: "Pride and Prejudice", author: 'Jane Austen', category: 'Romance' },
]

export default function LandingPage() {
    return (
        <section className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Libom Library</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Your gateway to knowledge and learning. Discover thousands of books, research materials, and digital
                        resources in our modern library.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/search">
                            <Button size="lg">Search Books</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">15,000+</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2,500+</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Years of Service</CardTitle>
                                <Award className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25+</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Daily Visitors</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">500+</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* About Founder */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Founder</h2>
                            <p className="text-gray-600 mb-4">
                                Dr. Sarah Johnson founded Libom Library in 1998 with a vision to create a modern learning space that
                                serves the community's educational needs. With over 30 years of experience in library science and
                                education, she has transformed this library into a hub of knowledge and innovation.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Under her leadership, Libom Library has grown from a small community library to a comprehensive learning
                                center with digital resources, research facilities, and community programs.
                            </p>
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                                    <p className="text-sm text-gray-600">Founder & Chief Librarian</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Image
                                src="/placeholder.svg?height=400&width=400"
                                alt="Dr. Sarah Johnson"
                                width={400}
                                height={400}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Book Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {categories.map((category) => (
                            <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <h3 className="font-medium">{category}</h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Books */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Books</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                            popularBooks.map((book, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow p-0">
                                    <CardContent className="p-0">
                                        <Image
                                            src="/placeholder.svg?height=200&width=150"
                                            alt={book.title}
                                            width={150}
                                            height={200}
                                            className="w-full h-48 object-cover rounded mb-4"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold mb-2 text-xl">{book.title}</h3>
                                            <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-6 w-6" />
                                <h3 className="text-xl font-bold">Libom Library</h3>
                            </div>
                            <p className="text-gray-400">Your trusted partner in learning and knowledge discovery.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact Info</h4>
                            <p className="text-gray-400 mb-2">123 Library Street</p>
                            <p className="text-gray-400 mb-2">City, State 12345</p>
                            <p className="text-gray-400 mb-2">Phone: (555) 123-4567</p>
                            <p className="text-gray-400">Email: info@libomlibrary.com</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Hours</h4>
                            <p className="text-gray-400 mb-2">Monday - Friday: 8:00 AM - 8:00 PM</p>
                            <p className="text-gray-400 mb-2">Saturday: 9:00 AM - 6:00 PM</p>
                            <p className="text-gray-400">Sunday: 12:00 PM - 5:00 PM</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Libom Library. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
    )
}
