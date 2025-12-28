"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

interface HistoryItem {
    period: string;
    strategy: string;
    result: string;
    metric: string;
    trend: "up" | "down" | "neutral";
    insight: string;
}

const historyData: HistoryItem[] = [
    {
        period: "Q3 2025",
        strategy: "Founder-Led Content",
        result: "+45% Bookings",
        metric: "High Trust",
        trend: "up",
        insight: "Direct video content from the founder resonated deeply with the target audience, establishing authority and reducing friction in sales calls."
    },
    {
        period: "Q2 2025",
        strategy: "Webinar Funnel",
        result: "-10% Show Rate",
        metric: "Fatigue",
        trend: "down",
        insight: "The market showed signs of webinar fatigue. While leads were cheap, intent was low, leading to wasted sales resources."
    },
    {
        period: "Q1 2025",
        strategy: "Cold Email Outreach",
        result: "Stable Growth",
        metric: "Consistent",
        trend: "neutral",
        insight: "Reliable but unscalable without significant team expansion. Served as a good baseline but hit a ceiling."
    }
];

export function StrategyHistory() {
    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle>Historical Strategy Analysis</CardTitle>
                </div>
                <CardDescription>
                    Deep dive into past strategic shifts and their impact on performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative border-l border-muted/50 ml-3 space-y-8 pb-4">
                    {historyData.map((item, index) => (
                        <div key={item.period} className="ml-6 relative">
                            {/* Dot */}
                            <div className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 bg-background ${item.trend === "up" ? "border-emerald-500" :
                                item.trend === "down" ? "border-red-500" : "border-muted-foreground"
                                }`} />

                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-muted-foreground">{item.period}</span>
                                        <Badge variant="outline">{item.strategy}</Badge>
                                    </div>
                                    <h4 className="text-lg font-bold flex items-center gap-2">
                                        {item.result}
                                        {item.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                                        {item.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                        {item.trend === "neutral" && <Minus className="h-4 w-4 text-muted-foreground" />}
                                    </h4>
                                </div>
                                <div className="bg-muted/30 p-4 rounded-lg text-sm text-foreground/80 max-w-lg border border-border/50">
                                    <span className="font-semibold block mb-1 text-primary/80">Why it worked (or didn't):</span>
                                    {item.insight}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
