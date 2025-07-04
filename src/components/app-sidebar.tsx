"use client"

import {
    AlertTriangle,
    BookOpen,
    Calendar,
    Clock,
    DollarSign,
    LayoutDashboard,
    TrendingDown,
    TrendingUp,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

const menuItems = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
    },
    {
        title: "Books Management",
        url: "/admin/books",
        icon: BookOpen,
    },
    {
        title: "Allocated Books",
        url: "/admin/allocations",
        icon: Calendar,
    },
    {
        title: "Submissions Books",
        url: "/admin/submissions",
        icon: Calendar,
    },
    {
        title: "Near Submission",
        url: "/admin/near-submission",
        icon: Clock,
    },
    {
        title: "Overdue Books",
        url: "/admin/overdue",
        icon: AlertTriangle,
    },
    {
        title: "Defaulters",
        url: "/admin/defaulters",
        icon: DollarSign,
    },
    {
        title: "Income Records",
        url: "/admin/incomes",
        icon: TrendingUp,
    },
    {
        title: "Expense Records",
        url: "/admin/expenses",
        icon: TrendingDown,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-xl font-bold">Libom</h1>
                        <p className="text-sm text-muted-foreground">Library Management</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
