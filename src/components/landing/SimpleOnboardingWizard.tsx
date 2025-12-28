"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Building2, Users, Target, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Simplified Demo Data
const EASY_DEMO_DATA = {
    step1: {
        businessName: "EcomScale Academy",
        whatDoYouDo: "I teach people how to start online stores.",
        website: "www.ecomscale-demo.com"
    },
    step2: {
        whoIsCustomer: "People who want to quit their 9-5 jobs.",
        mainProblem: "They don't know how to find products that sell.",
        whatYouSell: "A 6-week mentorship program + video course."
    },
    step3: {
        howYouGetLeads: "Instagram Stories and YouTube videos.",
        howManyLeads: "About 300 people click my links every month.",
        salesProcess: "I chat with them in DMs, then we get on a Zoom call."
    },
    step4: {
        goal: "I want to stop doing everything manually.",
        frustration: "I lose track of who I'm talking to in the DMs.",
        tone: "Friendly, helpful, but direct."
    }
};

export function SimpleOnboardingWizard() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(EASY_DEMO_DATA);

    const steps = [
        {
            id: "basics",
            title: "The Basics",
            desc: "Tell us a bit about your business.",
            icon: Building2,
            fields: [
                { id: "businessName", label: "Business Name", value: formData.step1.businessName },
                { id: "whatDoYouDo", label: "What do you do?", value: formData.step1.whatDoYouDo },
                { id: "website", label: "Website", value: formData.step1.website },
            ]
        },
        {
            id: "customer",
            title: "Your Customers",
            desc: "Who are we trying to help?",
            icon: Users,
            fields: [
                { id: "whoIsCustomer", label: "Who is your dream customer?", value: formData.step2.whoIsCustomer },
                { id: "mainProblem", label: "What is their biggest problem?", value: formData.step2.mainProblem },
                { id: "whatYouSell", label: "What exactly do you sell them?", value: formData.step2.whatYouSell },
            ]
        },
        {
            id: "sales",
            title: "Sales Process",
            desc: "How do you find and close clients?",
            icon: Target,
            fields: [
                { id: "howYouGetLeads", label: "Where do people find you?", value: formData.step3.howYouGetLeads },
                { id: "howManyLeads", label: "How many leads per month?", value: formData.step3.howManyLeads },
                { id: "salesProcess", label: "How do you sell to them?", value: formData.step3.salesProcess },
            ]
        },
        {
            id: "goals",
            title: "Goals & Pains",
            desc: "What do you want to fix?",
            icon: MessageSquare,
            fields: [
                { id: "goal", label: "What is your main goal?", value: formData.step4.goal },
                { id: "frustration", label: "What is annoying you right now?", value: formData.step4.frustration },
                { id: "tone", label: "How should we sound?", value: formData.step4.tone },
            ]
        }
    ];

    const currentStep = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            router.push("/internal");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleNext();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl border-2 shadow-2xl">
                <CardHeader className="bg-muted/30 border-b pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <currentStep.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
                                <CardDescription className="text-base">{currentStep.desc}</CardDescription>
                            </div>
                        </div>
                        <div className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border">
                            Step {step + 1} of {steps.length}
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {currentStep.fields.map((field, index) => (
                                <div key={field.id} className="space-y-2">
                                    <Label htmlFor={field.id} className="text-lg font-medium text-foreground/80">
                                        {field.label}
                                    </Label>
                                    <Input
                                        id={field.id}
                                        defaultValue={field.value}
                                        className="h-12 text-lg bg-muted/20 border-muted-foreground/20 focus:border-primary/50 transition-all font-light"
                                        onKeyDown={index === currentStep.fields.length - 1 ? handleKeyDown : undefined}
                                        autoFocus={index === 0}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 pt-8 border-t flex justify-end">
                        <Button onClick={handleNext} size="lg" className="w-full md:w-auto text-lg px-8 gap-2">
                            {step === steps.length - 1 ? "Complete Setup" : "Next Step"}
                            {step === steps.length - 1 ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
