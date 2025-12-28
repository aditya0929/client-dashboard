"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ArrowUpRight } from "lucide-react";

import { generateQuarterlyReport } from "@/lib/reportGenerator";

const reports = [
    {
        id: 1,
        title: "Q3 2025 Strategic Review",
        date: "Oct 01, 2025",
        type: "Quarterly Strategy",
        size: "2.4 MB",
    },
    {
        id: 2,
        title: "September 2025 Performance Report",
        date: "Oct 01, 2025",
        type: "Monthly Performance",
        size: "1.1 MB",
    },
    {
        id: 3,
        title: "August 2025 Performance Report",
        date: "Sep 01, 2025",
        type: "Monthly Performance",
        size: "1.2 MB",
    },
    {
        id: 4,
        title: "Founder-Led Content Analysis",
        date: "Aug 15, 2025",
        type: "Ad-hoc Analysis",
        size: "850 KB",
    },
];

export default function ReportsPage() {
    const handleGenerateReport = async () => {
        const sampleData = {
            companyName: "EcomScale Academy",
            quarter: "Q3 2025",
            measures: [
                "Implemented Founder-Led Content Strategy on LinkedIn",
                "Launched 'Inner Circle' Beta Community",
                "Optimized Cold Email Sequences for warmer leads",
                "Reduced ad spend on low-performing webinar funnels"
            ],
            salesNumbers: [
                { label: "Total Revenue", value: "$124,500" },
                { label: "Quarterly Growth", value: "+18%" },
                { label: "New Clients", value: "14" },
                { label: "Average Deal Size", value: "$8,900" }
            ],
            objectivesAchieved: [
                "Increase lead quality score by 20%",
                "Establish Founder authority in the market",
                "Launch community capability"
            ],
            objectivesPending: [
                "Scale ad spend to $10k/mo",
                "Automate 100% of client onboarding",
                "Hire 2nd setter"
            ]
        };
        await generateQuarterlyReport(sampleData);
    };

    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports Library</h1>
                        <p className="text-muted-foreground">Access all generated strategies and performance reports.</p>
                    </div>
                    <Button onClick={handleGenerateReport} className="bg-emerald-600 hover:bg-emerald-700">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Sample Q3 Report
                    </Button>
                </div>

                <div className="grid gap-4">
                    {reports.map((report) => (
                        <Card key={report.id} className="hover:bg-muted/50 transition-colors cursor-pointer group">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{report.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {report.date}
                                            </span>
                                            <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                                            <span>{report.type}</span>
                                            <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Download
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
