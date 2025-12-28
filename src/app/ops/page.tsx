import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const setterPerformance = [
    { name: "Alex Johnson", callsBooked: 45, showRate: "82%", closeRate: "24%", revenue: "$18,500" },
    { name: "Sarah Smith", callsBooked: 38, showRate: "75%", closeRate: "18%", revenue: "$12,300" },
    { name: "Mike Davis", callsBooked: 22, showRate: "90%", closeRate: "30%", revenue: "$14,800" },
];

const channelPerformance = [
    { channel: "LinkedIn (Organic)", leads: 120, conversations: 45, booked: 18, cpa: "$0" },
    { channel: "Cold Email", leads: 450, conversations: 30, booked: 8, cpa: "$15" },
    { channel: "Twitter / X", leads: 85, conversations: 25, booked: 12, cpa: "$0" },
];

export default function OpsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Internal Operations</h1>
                <p className="text-muted-foreground mt-2">Team performance and channel metrics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Setter Performance</CardTitle>
                        <CardDescription>Key metrics per team member.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Setter</TableHead>
                                    <TableHead className="text-right">Booked</TableHead>
                                    <TableHead className="text-right">Show%</TableHead>
                                    <TableHead className="text-right">Rev</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {setterPerformance.map((setter) => (
                                    <TableRow key={setter.name}>
                                        <TableCell className="font-medium">{setter.name}</TableCell>
                                        <TableCell className="text-right">{setter.callsBooked}</TableCell>
                                        <TableCell className="text-right">{setter.showRate}</TableCell>
                                        <TableCell className="text-right">{setter.revenue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Channel Efficiency</CardTitle>
                        <CardDescription>Lead volume vs. booking efficiency.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Channel</TableHead>
                                    <TableHead className="text-right">Leads</TableHead>
                                    <TableHead className="text-right">Booked</TableHead>
                                    <TableHead className="text-right">CPA</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {channelPerformance.map((channel) => (
                                    <TableRow key={channel.channel}>
                                        <TableCell className="font-medium">{channel.channel}</TableCell>
                                        <TableCell className="text-right">{channel.leads}</TableCell>
                                        <TableCell className="text-right">{channel.booked}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline">{channel.cpa}</Badge>
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
