
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import type React from "react"
import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Libom - Library Management System",
    description: "Professional library management system for administrators",
    generator: 'v0.dev'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={montserrat.className}>
                {/* <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                </ThemeProvider> */}
                {children}
                <Toaster />
            </body>
        </html>
    )
}
