"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Settings,
    UserPlus,
    PieChart,
    Workflow,
    LineChart,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";



export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 bg-sidebar/50 backdrop-blur-xl border-r border-sidebar-border p-4">
            <div className="flex items-center gap-2 px-2 py-4 mb-6">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    LV Connect
                </span>
            </div>

            <nav className="flex-1 space-y-6">

                {/* Client Section */}
                <div>
                    <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Client Portal
                    </h3>
                    <div className="space-y-1">
                        {[
                            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                        ].map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary shadow-sm hover:bg-primary/15"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="font-medium">{item.title}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Internal Section */}
                <div>
                    <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Agency Admin
                    </h3>
                    <div className="space-y-1">
                        {[
                            { title: "Internal Dashboard", href: "/internal", icon: BarChart3 },
                            { title: "Weekly Tracking", href: "/internal/tracking", icon: LineChart },
                            { title: "Automation Workflows", href: "/internal/automation", icon: Workflow },
                            { title: "Client Snapshot", href: "/snapshot", icon: PieChart },
                            { title: "Reports", href: "/reports", icon: FileText },
                        ].map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                                        pathname === item.href
                                            ? "bg-purple-500/10 text-purple-600 shadow-sm hover:bg-purple-500/15"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="font-medium">{item.title}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

            </nav>

            <div className="mt-auto pt-4 border-t border-sidebar-border">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-white/5">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Button>
            </div>
        </div>
    );
}
