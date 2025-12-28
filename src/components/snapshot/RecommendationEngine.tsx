import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, BrainCircuit, Target, Zap, Loader2, StickyNote } from "lucide-react";
import { generateImplementationPlan } from "@/lib/planGenerator";
import { generateStrategyAction } from "@/app/actions/generate-strategy";
import { DEMO_PROFILE } from "@/lib/types";

export function RecommendationEngine() {
    const [generating, setGenerating] = useState(false);
    const [customNotes, setCustomNotes] = useState("");

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            // Pass customNotes to the server action
            const result = await generateStrategyAction(DEMO_PROFILE, undefined, customNotes);

            if (result.success) {
                await generateImplementationPlan(DEMO_PROFILE, result.data);
            } else {
                console.error("Failed to generate strategy:", result.error);
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Error in generation flow:", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20 shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 font-bold text-lg">
                            AI Strategic Recommendation
                        </CardTitle>
                        <CardDescription>Based on Q3 performance and current market trends.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Pivot to "Community-First" Hybrid Model</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Our analysis indicates that your audience has high trust but is experiencing "pitch fatigue."
                        The Founder-Led content (Q3 Winner) built immense goodwill. The next logical step is not to sell
                        harder, but to <strong>monetize that community</strong> via a low-ticket, high-value entry point.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background/50 p-3 rounded-lg border flex flex-col gap-2">
                        <BrainCircuit className="h-5 w-5 text-blue-500" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Reasoning</span>
                        <p className="text-sm font-medium">Leverage high Q3 brand affinity to lower CAC.</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg border flex flex-col gap-2">
                        <Target className="h-5 w-5 text-emerald-500" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Expected Impact</span>
                        <p className="text-sm font-medium">+25% Lead Volume, +15% LTV.</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg border flex flex-col gap-2">
                        <Zap className="h-5 w-5 text-amber-500" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Action</span>
                        <p className="text-sm font-medium">Launch "Inner Circle" Beta.</p>
                    </div>
                </div>

                {/* Custom Notes Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <StickyNote className="h-4 w-4" />
                        Strategic Direction Notes
                    </div>
                    <Textarea
                        placeholder="Draft your high-level approach before generating the proposal... (e.g., 'The drop-off at VSL is the main bottleneck. We need to implement a Bridge Page strategy...')"
                        className="bg-background/50 min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">These notes will guide the AI generation process.</p>
                </div>

                <div className="pt-2">
                    <Button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
                    >
                        {generating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Plan with AI...
                            </>
                        ) : (
                            <>
                                Generate Implementation Plan
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
