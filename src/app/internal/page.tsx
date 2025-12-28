"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { DEMO_PROFILE } from "@/lib/types";

const clients = [
    {
        id: "ecom-scale",
        name: DEMO_PROFILE.name,
        industry: "E-commerce Education",
        status: "Needs Strategy",
        submitted: "Just now",
        priority: "High",
    },
    {
        id: "yogaflow",
        name: "YogaFlow Academy",
        industry: "Fitness Coaching",
        status: "Active",
        submitted: "2 days ago",
        priority: "Normal",
    },
    {
        id: "crypto-signals",
        name: "CryptoSignals VIP",
        industry: "Financial Services",
        status: "Proposal Sent",
        submitted: "5 days ago",
        priority: "Normal",
    },
];

export default function InternalDashboardHelper() {
    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Team Dashboard</h1>
                        <p className="text-muted-foreground">Manage incoming client intakes and strategy designs.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background">3 Active Clients</Badge>
                        <Button>Refresh Feed</Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Client Intakes</CardTitle>
                        <CardDescription>Recent submissions requiring team attention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client Name</TableHead>
                                    <TableHead>Industry</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map((client) => (
                                    <TableRow key={client.id} className={client.id === "ecom-scale" ? "bg-primary/5" : ""}>
                                        <TableCell className="font-medium">
                                            {client.name}
                                            {client.id === "ecom-scale" && (
                                                <Badge variant="secondary" className="ml-2 text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                                    New
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{client.industry}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={client.status} />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{client.submitted}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/internal/client/${client.id}`}>
                                                <Button size="sm" variant={client.id === "ecom-scale" ? "default" : "outline"}>
                                                    {client.id === "ecom-scale" ? "Start Design" : "View"}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "Needs Strategy") {
        return <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600"><AlertCircle className="w-3 h-3 mr-1" /> Needs Strategy</Badge>;
    }
    if (status === "Active") {
        return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>;
    }
    if (status === "Proposal Sent") {
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Proposal Sent</Badge>;
    }
    return <Badge>{status}</Badge>;
}
