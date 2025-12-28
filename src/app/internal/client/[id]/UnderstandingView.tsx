"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DEMO_PROFILE } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

export function UnderstandingView() {
    const data = DEMO_PROFILE.onboardingData;

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <AccordionItem value={title} className="border-b-0 mb-4 border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 transition-colors">
                <span className="font-semibold text-lg">{title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                {children}
            </AccordionContent>
        </AccordionItem>
    );

    const Field = ({ label, value }: { label: string, value: string }) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <Textarea
                readOnly
                value={value}
                className="min-h-[80px] bg-muted/30 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    );

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">Client Onboarding Form</CardTitle>
                            <CardDescription>Comprehensive overview of business goals, ICP, and operational details.</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            Completed
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible defaultValue="1. Company Information" className="w-full">

                        <Section title="1. Company Information">
                            <Field label="Who is the legally authorized decision-making person?" value={data.companyInfo.decisionMaker} />
                            <Field label="Social media login details" value={data.companyInfo.socials} />
                            <Field label="Billing details" value={data.companyInfo.billingDetails} />
                        </Section>

                        <Section title="2. About the Company">
                            <Field label="Which pain points of your ideal customers do you address most strongly?" value={data.aboutCompany.painPoints} />
                            <Field label="What makes you unique in your market?" value={data.aboutCompany.uniqueness} />
                            <Field label="What is your biggest added value?" value={data.aboutCompany.valueProp} />
                            <Field label="Brief Pitch" value={data.aboutCompany.pitch} />
                            <Field label="Services & Products" value={data.aboutCompany.services} />
                        </Section>

                        <Section title="3. Ideal Customer Profile (ICP)">
                            <Field label="Who is your ideal customer?" value={data.icp.idealCustomer} />
                            <Field label="Industry" value={data.icp.industry} />
                            <Field label="Job Titles" value={data.icp.jobTitles} />
                            <Field label="Average Deal Value" value={data.icp.dealValue} />
                            <Field label="Proudest Client Cases" value={data.icp.cases} />
                        </Section>

                        <Section title="4. Tone of Voice & Communication">
                            <Field label="How should the setter come across?" value={data.toneOfVoice.style} />
                            <Field label="Forbidden words/jargon" value={data.toneOfVoice.forbiddenWords} />
                            <Field label="Examples of successful messages" value={data.toneOfVoice.examples} />
                        </Section>

                        <Section title="5. Goals & Expectations">
                            <Field label="Most important goals" value={data.goals.mainGoal} />
                            <Field label="Key expectations" value={data.goals.expectations} />
                            <Field label="Target Appointments (KPIs)" value={data.goals.targetAppointments} />
                            <Field label="Definition of Success (1/3/12 months)" value={data.goals.successDefinition} />
                        </Section>

                        <Section title="6. Approach & Workflow">
                            <Field label="Channels" value={data.approach.channels} />
                            <Field label="Tools & CRM" value={data.approach.tools} />
                        </Section>

                        <Section title="7. Collaboration & Communication">
                            <Field label="Internal Point of Contact" value={data.collaboration.contactPerson} />
                            <Field label="Communication Style" value={data.collaboration.communicationStyle} />
                            <Field label="Update Frequency" value={data.collaboration.updateFrequency} />
                            <Field label="Meetings" value={data.collaboration.meetings} />
                        </Section>

                        <Section title="8. Practical Matters">
                            <Field label="Desired Start Date" value={data.practical.startDate} />
                            <Field label="Hours/Availability" value={data.practical.hours} />
                            <Field label="Required Materials" value={data.practical.materials} />
                        </Section>

                        <Section title="9. Additional Notes">
                            <Field label="Special details or extra comments" value={data.notes} />
                        </Section>

                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
