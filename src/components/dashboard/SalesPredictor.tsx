"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, TrendingUp, Sparkles, Check } from "lucide-react";

const proposals = [
    {
        id: "velocity",
        name: "The 'More Ads' Fix",
        risk: "Medium",
        growth: "+32%",
        description: "Focus on maximizing cold outreach volume and ad spend."
    },
    {
        id: "architect",
        name: "The 'Leaking Bucket' Fix",
        risk: "Low",
        growth: "+45%",
        description: "Refining existing funnels to improve conversion rates."
    },
    {
        id: "profit",
        name: "The 'Easy Money' Fix",
        risk: "Low",
        growth: "+18%",
        description: "Optimized mix of organic content and targeted outreach."
    }
];

const predictionData = {
    velocity: [
        { month: "Current", sales: 18500 },
        { month: "Month 1", sales: 22000 },
        { month: "Month 2", sales: 28500 },
        { month: "Month 3", sales: 38000 },
        { month: "Month 4", sales: 49000 },
        { month: "Month 5", sales: 62000 },
    ],
    architect: [
        { month: "Current", sales: 18500 },
        { month: "Month 1", sales: 24500 },
        { month: "Month 2", sales: 31500 },
        { month: "Month 3", sales: 42000 },
        { month: "Month 4", sales: 58000 },
        { month: "Month 5", sales: 75000 },
    ],
    profit: [
        { month: "Current", sales: 18500 },
        { month: "Month 1", sales: 20200 },
        { month: "Month 2", sales: 21800 },
        { month: "Month 3", sales: 23500 },
        { month: "Month 4", sales: 25200 },
        { month: "Month 5", sales: 28000 },
    ]
};

export function SalesPredictor() {
    const [selectedProposal, setSelectedProposal] = useState("architect");
    const activeProposal = proposals.find(p => p.id === selectedProposal) || proposals[1];
    const data = predictionData[selectedProposal as keyof typeof predictionData];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {/* Control Panel */}
            <Card className="md:col-span-1 border-primary/20 shadow-lg bg-gradient-to-b from-background to-muted/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Sales Simulator
                    </CardTitle>
                    <CardDescription>Select a proposal to forecast outcomes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Proposal</label>
                        <Select value={selectedProposal} onValueChange={setSelectedProposal}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {proposals.map(p => (
                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg space-y-3 border">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Projected Growth</span>
                            <span className="font-bold text-emerald-500">{activeProposal.growth}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Risk Level</span>
                            <Badge variant={activeProposal.risk === "High" ? "destructive" : activeProposal.risk === "Medium" ? "default" : "secondary"}>
                                {activeProposal.risk}
                            </Badge>
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                            {activeProposal.description}
                        </div>
                    </div>

                    <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
                        Approve Proposal
                        <Check className="ml-2 h-5 w-5" />
                    </Button>
                </CardContent>
            </Card>

            {/* Visual Chart */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Projected Revenue Curve</CardTitle>
                    <CardDescription>Estimated revenue trajectory over the next 5 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" className="text-xs font-medium" />
                            <YAxis className="text-xs font-medium" tickFormatter={(value) => `$${value / 1000}k`} />
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#f3f4f6" }}
                                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorSales)"
                                animationDuration={1000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
