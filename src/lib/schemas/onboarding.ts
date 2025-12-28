import * as z from "zod";

export const onboardingSchema = z.object({
    // Section 1: Company Information
    companyName: z.string().min(2, "Company name is required"),
    website: z.string().url("Please enter a valid URL"),
    industry: z.string().min(2, "Industry is required"),
    companySize: z.string().min(1, "Company size is required"),
    decisionMaker: z.string().min(2, "Primary decision maker name is required"),

    // Section 2: Offer & Revenue
    coreOffer: z.string().min(10, "Please describe your core offer"),
    averageDealSize: z.string().min(1, "Average deal size is required"),
    salesCycleLength: z.string().min(1, "Sales cycle length is required"),
    offerStructure: z.string().min(1, "Please specify if you have one or multiple offers"),

    // Section 3: ICP (Ideal Customer Profile)
    targetRoles: z.string().min(2, "Target roles are required"),
    targetCompanySize: z.string().min(1, "Target company size is required"),
    painPoints: z.string().min(10, "Primary pain points are required"),
    whyClientsBuy: z.string().min(10, "Please explain why clients usually say yes"),

    // Section 4: Lead Sources
    leadSources: z.array(z.string()).min(1, "Select at least one lead source"),
    leadVolume: z.string().min(1, "Approximate lead volume is required"),

    // Section 5: Goals & Expectations
    primaryObjective: z.string().min(5, "Primary objective is required"),
    targetCallsPerMonth: z.string().min(1, "Target calls per month is required"),
    expectations90Days: z.string().min(10, "Please describe your 90-day expectations"),

    // Section 6: Tone & Constraints
    communicationTone: z.string().min(2, "Desired tone is required"),
    avoidThings: z.string().min(2, "Please specify what to avoid"),
    successfulExamples: z.string().optional(),

    // Section 7: Open Notes
    additionalNotes: z.string().optional(),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export const steps = [
    {
        id: "company",
        title: "Business Context",
        fields: ["companyName", "website", "industry", "companySize", "decisionMaker"],
    },
    {
        id: "offer",
        title: "Commercial Reality",
        fields: ["coreOffer", "averageDealSize", "salesCycleLength", "offerStructure", "targetRoles", "targetCompanySize", "painPoints", "whyClientsBuy"],
    },
    {
        id: "sources",
        title: "Source Analysis",
        fields: ["leadSources", "leadVolume"],
    },
    {
        id: "goals",
        title: "Strategic Constraints",
        fields: ["primaryObjective", "targetCallsPerMonth", "expectations90Days", "communicationTone", "avoidThings", "successfulExamples"],
    },
];
