"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingUp, AlertTriangle, Check } from "lucide-react";
import { StrategyCardData } from "./StrategyGenerator";
import { useState, useEffect } from "react";

interface SalesSimulatorProps {
    strategies: StrategyCardData[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function SalesSimulator({ strategies, selectedId, onSelect }: SalesSimulatorProps) {
    const [mockMetric, setMockMetric] = useState(22);

    const selectedStrategy = strategies.find(s => s.id === selectedId);

    // Deterministic dummy data generator
    useEffect(() => {
        if (selectedId) {
            // Simple hash based on string length to get "random" but consistent numbers
            const hash = selectedId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
            setMockMetric(15 + (hash % 25)); // Growth between 15% and 40%
        }
    }, [selectedId]);

    const handleApprove = () => {
        alert(`Strategy "${selectedStrategy?.title}" Approved! Moving to Execution Phase...`);
    };

    return (
        <Card className="h-fit sticky top-6 border-2 border-dashed border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Sales Simulator
                </CardTitle>
                <CardDescription>
                    Select a proposal to forecast outcomes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Proposal Selector */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Select Proposal</label>
                    <Select value={selectedId || ""} onValueChange={onSelect}>
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Choose a strategy..." />
                        </SelectTrigger>
                        <SelectContent>
                            {strategies.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                    {s.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedStrategy ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Metrics Card */}
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-sm font-medium text-muted-foreground">Projected Growth</span>
                                <span className="text-2xl font-bold text-emerald-500">+{mockMetric}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
                                <Badge variant="secondary" className={`
                                    ${mockMetric > 30 ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}
                                `}>
                                    {mockMetric > 30 ? "Medium" : "Low"}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground pt-2">
                                Based on standard industry benchmarks for {selectedStrategy.focus} campaigns.
                            </p>
                        </div>

                        {/* Dummy Graph Visualization */}
                        <div className="h-24 flex items-end gap-1 px-2 border-b border-l border-border/50 pb-1">
                            {[40, 65, 45, 80, 55, 90, mockMetric + 60].map((h, i) => (
                                <div
                                    key={i}
                                    className="bg-primary/20 hover:bg-primary/40 transition-all rounded-t-sm w-full"
                                    style={{ height: `${h}%` }}
                                ></div>
                            ))}
                        </div>

                        {/* Approve Button */}
                        <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all hover:shadow-lg"
                            size="lg"
                            onClick={handleApprove}
                        >
                            Approve Proposal <Check className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="py-8 text-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Select a strategy above to see the forecast.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
