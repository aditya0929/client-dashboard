"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Download, PlayCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_PROFILE } from "@/lib/types";

export function FunnelInputForm() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(DEMO_PROFILE.funnelData);

    const steps = [
        {
            id: "story",
            label: "Monthly Story Views",
            icon: Users,
            field: "storyViews",
            description: "Total unique views on your top-of-funnel content.",
            color: "text-blue-500"
        },
        {
            id: "downloads",
            label: "Plan Downloads",
            icon: Download,
            field: "planDownloads",
            description: "How many leads opted in for the free step-by-step plan?",
            color: "text-purple-500"
        },
        {
            id: "vsl",
            label: "VSL Views",
            icon: PlayCircle,
            field: "vslViews",
            description: "Total unique plays on your Video Sales Letter.",
            color: "text-amber-500"
        },
        {
            id: "booked",
            label: "Calls Booked",
            icon: Phone,
            field: "callsBooked",
            description: "Qualified sales calls scheduled this month.",
            color: "text-emerald-500"
        }
    ];

    const currentStep = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // Redirect to Team Dashboard (Internal View) for the demo flow
            router.push("/internal");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleNext();
        }
    };

    const handleChange = (val: string) => {
        setFormData({ ...formData, [currentStep.field]: parseInt(val) || 0 });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto p-4">
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Client Portal Setup</h1>
                <p className="text-muted-foreground text-lg">
                    Enter your {DEMO_PROFILE.name} funnel metrics to initialize the dashboard.
                </p>
            </div>

            <Card className="w-full border-2 shadow-xl bg-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }} />

                <CardContent className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-full bg-muted/50 ${currentStep.color}`}>
                                    <currentStep.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold">{currentStep.label}</h2>
                                    <p className="text-muted-foreground">{currentStep.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="input-metric" className="sr-only">Value</Label>
                                <div className="relative">
                                    <Input
                                        id="input-metric"
                                        type="number"
                                        className="text-4xl h-auto py-6 px-6 font-mono tracking-tight"
                                        value={formData[currentStep.field as keyof typeof formData]}
                                        onChange={(e) => handleChange(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium animate-pulse">
                                        Press Enter ↵
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleNext} className="w-full h-12 text-lg gap-2" size="lg">
                                {step === steps.length - 1 ? "Generate Dashboard" : "Next Step"}
                                {step === steps.length - 1 ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>

            <div className="mt-8 flex gap-2">
                {steps.map((s, i) => (
                    <div
                        key={s.id}
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${i === step ? "bg-primary scale-125" : i < step ? "bg-primary/50" : "bg-muted"}`}
                    />
                ))}
            </div>
        </div>
    );
}
