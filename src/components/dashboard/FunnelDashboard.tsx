"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DEMO_PROFILE, EcomFunnelData } from "@/lib/types";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from "recharts";
import { AlertCircle, TrendingUp, DollarSign, Users } from "lucide-react";

export default function FunnelDashboard() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<EcomFunnelData>(DEMO_PROFILE.funnelData);

    useEffect(() => {
        const dataParam = searchParams.get("data");
        if (dataParam) {
            try {
                setData(JSON.parse(dataParam));
            } catch (e) {
                console.error("Failed to parse data", e);
            }
        }
    }, [searchParams]);

    // Calculations
    const storyToPlan = ((data.planDownloads / data.storyViews) * 100).toFixed(1);
    const planToVsl = ((data.vslViews / data.planDownloads) * 100).toFixed(1);
    const vslToCall = ((data.callsBooked / data.vslViews) * 100).toFixed(1);

    // Using $3,800 deal size * 20% estimated close rate for revenue projection
    const projectedRevenue = (data.callsBooked * 0.2 * 3800).toLocaleString();

    const chartData = [
        { name: "Story Views", value: data.storyViews, color: "#3b82f6" },
        { name: "Plan Downloads", value: data.planDownloads, color: "#8b5cf6" },
        { name: "VSL Views", value: data.vslViews, color: "#f59e0b" },
        { name: "Calls Booked", value: data.callsBooked, color: "#10b981" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Funnel Health</h2>
                    <p className="text-muted-foreground">Real-time analysis of the {DEMO_PROFILE.name} ecosystem.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export CSV</Button>
                    <Button>Refresh Data</Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${projectedRevenue}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Story Retention</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{storyToPlan}%</div>
                        <p className="text-xs text-muted-foreground">Story -&gt; Download conv.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">VSL Throughput</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{planToVsl}%</div>
                        <p className="text-xs text-muted-foreground">Plan -&gt; VSL conv.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">2 Critical</div>
                        <p className="text-xs text-muted-foreground">Requires Strategy Review</p>
                    </CardContent>
                </Card>
            </div>

            {/* Funnel Viz */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Funnel Velocity Visualizer</CardTitle>
                    <CardDescription>Visualizing drop-off points across the customer journey.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ background: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
