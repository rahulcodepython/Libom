import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen bg-gradient-to-b">
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Libom Library</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={'/'}>
                            <Button variant="outline" className="text-gray-900">
                                <span className="hidden md:inline">Home</span>
                            </Button>
                        </Link>
                        <Link href={'/search'}>
                            <Button variant="outline" className="text-gray-900">
                                <span className="hidden md:inline">Search</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            {children}
        </main>
    )
}

export default PublicLayout