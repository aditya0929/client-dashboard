"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";

export function AutomationWorkflow() {
    const [step, setStep] = useState<"upload" | "validate" | "sync">("upload");
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = () => {
        // Simulate upload
        setFileName("tracking_sheet_week_38.xlsx");
        setStep("validate");
    };

    const handleSync = () => {
        setStep("sync");
        // Simulate sync delay
        setTimeout(() => {
            setStep("upload"); // Reset for demo or show success state
            setFileName(null);
            alert("Data synced successfully!");
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Automation Workflows</h2>
                    <p className="text-muted-foreground">Manage and run automated data processing tasks.</p>
                </div>
                <Button variant="outline" onClick={() => setStep("upload")} disabled={step === "upload"}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Workflow
                </Button>
            </div>

            {/* Workflow Steps */}
            <div className="flex items-center justify-center py-6">
                <div className="flex items-center gap-4">
                    <WorkflowStep
                        active={step === "upload"}
                        completed={step === "validate" || step === "sync"}
                        icon={UploadCloud}
                        label="1. Upload Sheet"
                    />
                    <div className={`w-16 h-0.5 ${step === "validate" || step === "sync" ? "bg-primary" : "bg-muted"}`} />
                    <WorkflowStep
                        active={step === "validate"}
                        completed={step === "sync"}
                        icon={FileSpreadsheet}
                        label="2. Validate Data"
                    />
                    <div className={`w-16 h-0.5 ${step === "sync" ? "bg-primary" : "bg-muted"}`} />
                    <WorkflowStep
                        active={step === "sync"}
                        completed={false}
                        icon={CheckCircle2}
                        label="3. System Sync"
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="grid gap-6">
                {step === "upload" && (
                    <Card className="border-dashed border-2">
                        <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <UploadCloud className="h-10 w-10 text-primary" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-xl font-semibold">Upload Weekly Tracking Sheet</h3>
                                <p className="text-muted-foreground max-w-sm">
                                    Drag and drop your Excel or CSV file here, or click to browse.
                                </p>
                            </div>
                            <Button size="lg" onClick={handleFileUpload}>
                                Select File
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {step === "validate" && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Data Validation</CardTitle>
                                    <CardDescription>Reviewing data from <span className="font-semibold text-primary">{fileName}</span></CardDescription>
                                </div>
                                <Button onClick={handleSync}>
                                    Confirm & Sync
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>WEEK</TableHead>
                                            <TableHead>DATUM</TableHead>
                                            <TableHead>CONVOS</TableHead>
                                            <TableHead>STAPPENPLAN</TableHead>
                                            <TableHead>ECOM FREEDOM</TableHead>
                                            <TableHead>MENTORS</TableHead>
                                            <TableHead>CALL PROPOSALS</TableHead>
                                            <TableHead>CALLS BOOKED</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">38</TableCell>
                                            <TableCell>15-09-2025</TableCell>
                                            <TableCell>206</TableCell>
                                            <TableCell>58</TableCell>
                                            <TableCell>7</TableCell>
                                            <TableCell>3</TableCell>
                                            <TableCell>14</TableCell>
                                            <TableCell>5</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">38</TableCell>
                                            <TableCell>16-09-2025</TableCell>
                                            <TableCell>183</TableCell>
                                            <TableCell>61</TableCell>
                                            <TableCell>4</TableCell>
                                            <TableCell>2</TableCell>
                                            <TableCell>9</TableCell>
                                            <TableCell>4</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">38</TableCell>
                                            <TableCell>17-09-2025</TableCell>
                                            <TableCell>176</TableCell>
                                            <TableCell>44</TableCell>
                                            <TableCell>4</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell>11</TableCell>
                                            <TableCell>6</TableCell>
                                        </TableRow>
                                        <TableRow className="bg-muted/50 font-semibold">
                                            <TableCell>Totals</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>565</TableCell>
                                            <TableCell>163</TableCell>
                                            <TableCell>15</TableCell>
                                            <TableCell>6</TableCell>
                                            <TableCell>34</TableCell>
                                            <TableCell>15</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
                                <AlertCircle className="h-4 w-4" />
                                <span>Please verify the column mappings before syncing. "Calls Booked" looks low for Week 38.</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === "sync" && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
                            <div className="relative h-24 w-24">
                                <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                <CheckCircle2 className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold">Syncing Data to Dashboard...</h3>
                                <p className="text-muted-foreground mb-4">Updating live metrics and generating reports.</p>
                                <Button className="mt-4" onClick={() => window.location.href = '/internal/tracking'}>
                                    View Live Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function WorkflowStep({ active, completed, icon: Icon, label }: { active: boolean, completed: boolean, icon: any, label: string }) {
    return (
        <div className={`flex flex-col items-center gap-2 ${active ? "text-primary" : completed ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? "border-primary bg-primary/10" :
                completed ? "border-primary/50 bg-primary/5" :
                    "border-muted bg-muted/20"
                }`}>
                <Icon className={`h-5 w-5 ${active || completed ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <span className={`text-sm font-medium ${active ? "text-foreground" : ""}`}>{label}</span>
        </div>
    );
}
