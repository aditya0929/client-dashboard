"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Sparkles, Check, Zap, Target, BarChart3, ArrowRight, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generateImplementationPlan } from "@/lib/planGenerator";
import { generateStrategyAction } from "@/app/actions/generate-strategy";
import { generateStrategyOptionsAction } from "@/app/actions/generate-strategy-options";
import { generateAssetsAction } from "@/app/actions/generate-assets";
import { DEMO_PROFILE, AssetBundle } from "@/lib/types";

export interface StrategyCardData {
    id: string;
    title: string;
    focus: string;
    impact: string;
    color: string;
    bg: string;
    icon: React.ElementType;
    description: string;
    steps: string[];
}

const defaultStrategies: StrategyCardData[] = [
    {
        id: "velocity",
        title: "The 'More Ads' Fix",
        focus: "Get More Eyeballs",
        impact: "Fast Results",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        icon: Zap,
        description: "Your best content is hidden. We need to pay a little bit regarding ads to make sure more people see your best Stories.",
        steps: ["Pick your top 3 best Stories.", "Spend $10/day boosting them.", "Send people to your DMs, not a website."]
    },
    {
        id: "architect",
        title: "The 'Leaking Bucket' Fix",
        focus: "Fix the Drop-off",
        impact: "Best ROI",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        icon: Target,
        description: "People download your Plan but don't watch the video. We need to make the video impossible to miss.",
        steps: ["Put the video directly on the 'Thank You' page.", "Send a text message 5 minutes after they download.", "Change the headline to be more exciting."]
    },
    {
        id: "profit",
        title: "The 'Easy Money' Fix",
        focus: "Retargeting",
        impact: "Quick Cash",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        icon: BarChart3,
        description: "People who watched your video but didn't book are ready to buy. They just need a nudge.",
        steps: ["Show them a simple ad: 'Still looking for help?'", "Offer a special 'Fast Action' bonus.", "Call them directly if you have their number."]
    }
];

export function StrategyGenerator() {
    const [generating, setGenerating] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [strategies, setStrategies] = useState<StrategyCardData[]>(defaultStrategies);
    const [generatingOptions, setGeneratingOptions] = useState(false);
    const [notes, setNotes] = useState("");

    // Asset Generation State
    const [assets, setAssets] = useState<AssetBundle | null>(null);
    const [generatingAssets, setGeneratingAssets] = useState(false);

    const generateDoc = async (strategyTitle: string) => {
        setGenerating(true);
        const selectedStrategy = strategies.find(s => s.title === strategyTitle);

        if (!selectedStrategy) return;

        try {
            // Generate dynamic content from AI
            const response = await generateStrategyAction(DEMO_PROFILE, selectedStrategy.title);

            if (!response.success || !response.data) {
                // @ts-ignore - Validated that error property exists on the failure union type
                alert(response.error || "Failed to generate strategy.");
                setGenerating(false);
                return;
            }

            // Generate DOCX using the shared utility
            await generateImplementationPlan(DEMO_PROFILE, response.data);

        } catch (error) {
            console.error("Failed to generate doc:", error);
            alert("An error occurred while generating the strategy.");
        } finally {
            setGenerating(false);
        }
    };

    const handleGenerateOptions = async () => {
        if (!notes.trim()) return;
        setGeneratingOptions(true);
        try {
            const result = await generateStrategyOptionsAction(DEMO_PROFILE, notes);
            if (result.success) {
                // Map icons/colors based on simple keyword matching or random assignment for variety
                // Since AI doesn't return icon/color, we preserve the visual style of the 3 cards cyclically
                const styledStrategies: StrategyCardData[] = result.data.map((s, i) => ({
                    id: s.id,
                    title: s.title,
                    focus: s.focus,
                    impact: s.impact,
                    description: s.description,
                    steps: s.steps,
                    color: defaultStrategies[i % 3].color,
                    bg: defaultStrategies[i % 3].bg,
                    icon: defaultStrategies[i % 3].icon
                }));
                setStrategies(styledStrategies);
            } else {
                alert(result.error || "Failed to generate options.");
            }
        } catch (error) {
            console.error("Failed to generate options:", error);
        } finally {
            setGeneratingOptions(false);
        }
    };

    const handleGenerateAssets = async () => {
        if (!notes.trim()) {
            alert("Please enter some Strategic Direction Notes first so we know what assets to create!");
            return;
        }
        setGeneratingAssets(true);
        try {
            const result = await generateAssetsAction(DEMO_PROFILE, notes);
            if (result.success) {
                setAssets(result.data);
            } else {
                alert(result.error || "Failed to generate assets.");
            }
        } catch (error) {
            console.error("Failed to generate assets:", error);
        } finally {
            setGeneratingAssets(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // In a real app, toast notification here
    };

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700 delay-200">
            {/* ... (Previous Header and Note Input) ... */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-purple-500" />
                            AI Strategy Proposals
                        </h2>
                        <p className="text-muted-foreground">3 simple options to fix your bottleneck.</p>
                    </div>
                </div>

                {/* Strategic Notes Input */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                    Strategic Direction Notes
                                </label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="e.g. Focus on organic strategies using Instagram Reels..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter your strategic thoughts here, and our AI will generate 3 tailored proposal options below.
                                </p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button
                                    onClick={handleGenerateAssets}
                                    disabled={generatingAssets || !notes.trim()}
                                    variant="outline"
                                    size="sm"
                                    className="border-purple-500/20 text-purple-600 hover:bg-purple-500/10"
                                >
                                    {generatingAssets ? (
                                        <>
                                            <Zap className="mr-2 h-4 w-4 animate-spin" />
                                            Generating Assets...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="mr-2 h-4 w-4" />
                                            Generate Instant Assets
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleGenerateOptions}
                                    disabled={generatingOptions || !notes.trim()}
                                    size="sm"
                                >
                                    {generatingOptions ? (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                            Generating Options...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Update Proposals with AI
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {strategies.map((s) => (
                        <Card
                            key={s.id}
                            className={`cursor-pointer transition-all hover:shadow-lg border-2 ${selected === s.id ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
                            onClick={() => setSelected(s.id)}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`p-2 rounded-lg ${s.bg}`}>
                                        <s.icon className={`h-6 w-6 ${s.color}`} />
                                    </div>
                                    {selected === s.id && <Check className="h-5 w-5 text-primary" />}
                                </div>
                                <CardTitle>{s.title}</CardTitle>
                                <CardDescription className="flex gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">{s.focus}</Badge>
                                    <Badge variant="outline" className="text-xs">{s.impact}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {s.description}
                                </p>
                                <div className="space-y-2 pt-2 border-t border-border/50">
                                    {s.steps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <ArrowRight className="h-3 w-3 text-primary" />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full gap-2"
                                    variant={selected === s.id ? "default" : "outline"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        generateDoc(s.title);
                                    }}
                                >
                                    <FileDown className="h-4 w-4" />
                                    {generating && selected === s.id ? "Creating Doc..." : "Download Strategy (.docx)"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Instant Launchpad Section */}
            {assets && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                                <Zap className="h-6 w-6 text-amber-500" />
                                Instant Launchpad
                            </h2>
                            <p className="text-muted-foreground">Ready-to-use assets generated from your strategy.</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Viral Hooks */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-500" /> Viral Hooks
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {assets.viralHooks.map((hook, i) => (
                                    <div key={i} className="flex items-start justify-between gap-3 p-3 bg-muted/50 rounded-lg text-sm">
                                        <p>{hook}</p>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => copyToClipboard(hook)}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Headlines */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-emerald-500" /> Ad Headlines
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {assets.headlines.map((headline, i) => (
                                    <div key={i} className="flex items-start justify-between gap-3 p-3 bg-muted/50 rounded-lg text-sm">
                                        <p className="font-medium">"{headline}"</p>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => copyToClipboard(headline)}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Email Draft */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileDown className="h-5 w-5 text-purple-500" /> Email Draft
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                    <span className="text-sm font-semibold text-muted-foreground">Subject: {assets.emailDraft.subject}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(assets.emailDraft.subject)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="text-sm whitespace-pre-wrap leading-relaxed pt-2">
                                    {assets.emailDraft.body}
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(assets.emailDraft.body)}>
                                        <Copy className="mr-2 h-3 w-3" /> Copy Body
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
