"use client";

import { StrategyGenerator } from "@/components/dashboard/StrategyGenerator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_PROFILE } from "@/lib/types";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { UnderstandingView } from "./UnderstandingView"; // We'll create this file next
import { Textarea } from "@/components/ui/textarea";

export default function ClientWorkstationPage({ params }: { params: { id: string } }) {

    // In a real app, fetch client by ID. Here we use demo profile.
    const client = DEMO_PROFILE;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/internal">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                            <Badge variant="outline" className="text-blue-500 border-blue-500/30">Needs Strategy</Badge>
                        </div>
                        <p className="text-muted-foreground">Strategy Workstation</p>
                    </div>
                </div>

                <Tabs defaultValue="understanding" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 h-14 bg-muted/50 p-1">
                        <TabsTrigger value="understanding" className="text-base">1. Understanding</TabsTrigger>
                        <TabsTrigger value="proposal" className="text-base">2. Proposal</TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Understanding */}
                    <TabsContent value="understanding" className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <UnderstandingView />
                    </TabsContent>

                    {/* Tab 2: Proposal (Renumbered from 3) */}
                    <TabsContent value="proposal" className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-blue-500" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                AI has analyzed the inputs from the 'Understanding' phase and generated 3 options below.
                            </p>
                        </div>
                        <StrategyGenerator />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
