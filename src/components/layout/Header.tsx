"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
    return (
        <header className="flex h-16 items-center border-b border-border bg-background/50 backdrop-blur-xl px-6">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..." // Intentionally simple placeholder
                            className="w-64 rounded-xl bg-muted/50 pl-9 focus-visible:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mr-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Demo Mode: Data is for demonstration purposes</span>
                    </div>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <div className="h-8 w-[1px] bg-border" />
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right hidden md:block">
                            <span className="text-sm font-medium">Alex Johnson</span>
                            <span className="text-xs text-muted-foreground">Admin</span>
                        </div>
                        <Avatar className="h-9 w-9 border border-border">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                            <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
}
