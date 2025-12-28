"use client";

import { AutomationWorkflow } from "@/components/internal/AutomationWorkflow";

export default function AutomationPage() {
    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <AutomationWorkflow />
            </div>
        </div>
    );
}
