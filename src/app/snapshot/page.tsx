"use client";

import { StrategyHistory } from "@/components/snapshot/StrategyHistory";
import { RecommendationEngine } from "@/components/snapshot/RecommendationEngine";
import { Badge } from "@/components/ui/badge";
import { DEMO_PROFILE } from "@/lib/types";

export default function ClientSnapshotPage() {
    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Profile */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{DEMO_PROFILE.name}</h1>
                        <p className="text-muted-foreground">Strategic Overview & Intelligence</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-semibold text-muted-foreground uppercase">Retention Score</span>
                            <span className="text-xl font-bold text-emerald-500">98/100</span>
                        </div>
                        <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                            <span className="font-bold text-emerald-600">A+</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8">
                    {/* Top: AI Recommendation - High Priority */}
                    <RecommendationEngine />

                    {/* Middle: Historical Context */}
                    <StrategyHistory />
                </div>
            </div>
        </div>
    );
}
