"use client";

import { Suspense } from "react";
import FunnelDashboard from "@/components/dashboard/FunnelDashboard";
import { SalesPredictor } from "@/components/dashboard/SalesPredictor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-xl">
                            E
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">EcomScale Academy</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Client Portal</span>
                                <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5">Live Data</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                        <div className="h-8 w-8 rounded-full bg-muted border border-border" />
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="bg-muted/50 p-1">
                        <TabsTrigger value="overview">Overview & Health</TabsTrigger>
                        <TabsTrigger value="prediction">AI Predicted Sales Overview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        <Suspense fallback={<div>Loading funnel data...</div>}>
                            <FunnelDashboard />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="prediction" className="space-y-8">
                        <Suspense fallback={<div>Loading prediction engine...</div>}>
                            <SalesPredictor />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
