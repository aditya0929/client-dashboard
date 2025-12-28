"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Mock data replicating the Excel sheet
const trackingData = [
    { week: 38, date: "15-09-2025", convos: 206, steps: 58, ecom: 7, mentors: 3, proposals: 14, booked: 5 },
    { week: 38, date: "16-09-2025", convos: 183, steps: 61, ecom: 4, mentors: 2, proposals: 9, booked: 4 },
    { week: 38, date: "17-09-2025", convos: 176, steps: 44, ecom: 4, mentors: 1, proposals: 11, booked: 6 },
    { week: 38, date: "18-09-2025", convos: 416, steps: 71, ecom: 8, mentors: 4, proposals: 14, booked: 6 },
    { week: 38, date: "19-09-2025", convos: 187, steps: 48, ecom: 6, mentors: 5, proposals: 12, booked: 2 },
    { week: 38, date: "20-09-2025", convos: 112, steps: 7, ecom: 1, mentors: 0, proposals: 5, booked: 2 },
    { week: 38, date: "21-09-2025", convos: 203, steps: 92, ecom: 14, mentors: 5, proposals: 4, booked: 4 },
];

const kpiData = [
    { label: "Total Conversations", value: "1,483", change: "+12.5%", trend: "up" },
    { label: "Step Plans Sent", value: "381", change: "+8.2%", trend: "up" },
    { label: "Calls Booked", value: "29", change: "-2.4%", trend: "down" },
    { label: "Conversion Rate", value: "1.9%", change: "0%", trend: "neutral" },
];

export default function WeeklyTrackingPage() {
    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Weekly Performance</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-background">Week 38</Badge>
                            <span className="text-muted-foreground text-sm">Sep 15 - Sep 21, 2025</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter Week
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {kpiData.map((kpi) => (
                        <Card key={kpi.label}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {kpi.label}
                                </CardTitle>
                                {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                                {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                {kpi.trend === "neutral" && <Minus className="h-4 w-4 text-muted-foreground" />}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{kpi.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={kpi.trend === "up" ? "text-emerald-500" : kpi.trend === "down" ? "text-red-500" : ""}>
                                        {kpi.change}
                                    </span> feature last week
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Visualizations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Conversation to Booking Flow</CardTitle>
                        <CardDescription>Daily breakdown of volume vs results.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trackingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="date" className="text-xs" tickFormatter={(value) => value.split("-")[0]} />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#f3f4f6" }}
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="convos" name="Conversations" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="right" dataKey="booked" name="Calls Booked" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Detailed Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Tracking Data</CardTitle>
                        <CardDescription>Raw data from tracking sheet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>WEEK</TableHead>
                                    <TableHead>DATUM</TableHead>
                                    <TableHead className="text-right">CONVOS</TableHead>
                                    <TableHead className="text-right">STAPPENPLAN</TableHead>
                                    <TableHead className="text-right">ECOM FREEDOM</TableHead>
                                    <TableHead className="text-right">MENTORS</TableHead>
                                    <TableHead className="text-right">CALL PROPOSALS</TableHead>
                                    <TableHead className="text-right">CALLS BOOKED</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trackingData.map((row) => (
                                    <TableRow key={row.date}>
                                        <TableCell className="font-medium">{row.week}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell className="text-right">{row.convos}</TableCell>
                                        <TableCell className="text-right">{row.steps}</TableCell>
                                        <TableCell className="text-right">{row.ecom}</TableCell>
                                        <TableCell className="text-right">{row.mentors}</TableCell>
                                        <TableCell className="text-right">{row.proposals}</TableCell>
                                        <TableCell className="text-right font-bold text-emerald-500">{row.booked}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="bg-muted/50 font-bold">
                                    <TableCell>Totals</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell className="text-right">1483</TableCell>
                                    <TableCell className="text-right">381</TableCell>
                                    <TableCell className="text-right">44</TableCell>
                                    <TableCell className="text-right">20</TableCell>
                                    <TableCell className="text-right">69</TableCell>
                                    <TableCell className="text-right text-emerald-500">29</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
