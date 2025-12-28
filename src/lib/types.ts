export interface EcomFunnelData {
    storyViews: number;
    planDownloads: number;
    vslViews: number;
    callsBooked: number;
    revenue: number;
}

export interface OnboardingData {
    companyInfo: {
        decisionMaker: string;
        socials: string;
        billingDetails: string;
    };
    aboutCompany: {
        painPoints: string;
        valueProp: string;
        uniqueness: string;
        pitch: string;
        services: string;
    };
    icp: {
        idealCustomer: string;
        industry: string;
        dealValue: string;
        jobTitles: string;
        cases: string;
    };
    toneOfVoice: {
        style: string;
        forbiddenWords: string;
        examples: string;
    };
    goals: {
        mainGoal: string;
        expectations: string;
        targetAppointments: string;
        successDefinition: string;
    };
    approach: {
        channels: string;
        tools: string;
    };
    collaboration: {
        contactPerson: string;
        communicationStyle: string;
        updateFrequency: string;
        meetings: string;
    };
    practical: {
        startDate: string;
        hours: string;
        materials: string;
    };
    notes: string;
}

export interface ClientProfile {
    name: string;
    industry: string;
    offer: string;
    funnelData: EcomFunnelData;
    story: string; // "The struggles"
    idealCustomer: string; // "Who they want"
    currentBottleneck: string; // "What's broken"
    onboardingData: OnboardingData;
}

export const DEMO_PROFILE: ClientProfile = {
    name: "EcomScale Academy",
    industry: "Online Education (E-commerce)",
    offer: "Dropshipping Mentorship ($3,800)",
    funnelData: {
        storyViews: 12500,
        planDownloads: 850,
        vslViews: 320,
        callsBooked: 45,
        revenue: 45 * 3800 * 0.2 // ~34k
    },
    story: "Started 2 years ago teaching dropshipping. Content goes viral easily, but I'm overwhelmed by DMs. I have 4 setters but they are messy.",
    idealCustomer: "People stuck in 9-5 jobs who want freedom. They are skeptical of 'get rich quick' but want a clear plan.",
    currentBottleneck: "Huge drop-off after they download the free plan. They take the PDF and never watch the video explaining the mentorship.",
    onboardingData: {
        companyInfo: {
            decisionMaker: "Alex Johnson (Founder)",
            socials: "@ecomscale_alex (IG), /in/alexjohnson-ecom (LinkedIn)",
            billingDetails: "EcomScale LLC, 123 Tech Blvd, Austin TX, VAT: N/A"
        },
        aboutCompany: {
            painPoints: "They feel stuck in a rigid 9-5, undervalued by bosses, and terrified of financial instability. They want autonomy but fear failure.",
            valueProp: "A proven, step-by-step roadmap that minimizes risk. We don't just sell a course; we provide weekly coaching calls and product validation.",
            uniqueness: "We are the only mentorship that actually audits your store before you launch ads. Most others just give videos.",
            pitch: "We help professionals replace their salary in 6 months by building a lean, automated dropshipping brand, without risking their savings on bad ads.",
            services: "Core Offer: 'Freedom eCom Accelerator' - 12 week program. Price: $3,800 or 3x $1,400."
        },
        icp: {
            idealCustomer: "Mid-level corporate employees (25-40yo), earned income $60k-$120k.",
            industry: "Tech, Finance, Healthcare (stressful jobs)",
            dealValue: "$3,800 LTV",
            jobTitles: "Software Engineer, Project Manager, Accountant, Sales Rep",
            cases: "Helped Sarah (Nurse) quit her job in 4 months. Helped Mike (Engineer) hit $10k/mo profit."
        },
        toneOfVoice: {
            style: "Advisory, Empathetic, but Direct. 'Tough love' mentor vibe.",
            forbiddenWords: "Crypto, Passive Income, Get Rich Quick, Easy, Magic",
            examples: "Instead of 'Buy now', say 'If you're serious about fixing this, let's talk'."
        },
        goals: {
            mainGoal: "Maximize booked calls for the sales team. We have capacity for 100 calls/month.",
            expectations: "Proactive communication. If a script isn't working, tell us immediately.",
            targetAppointments: "60 qualified appointments per month.",
            successDefinition: "Month 1: 30 calls booked. Month 3: 80 calls booked with >20% show rate."
        },
        approach: {
            channels: "Instagram DMs (Primary), LinkedIn (Secondary)",
            tools: "GoHighLevel for CRM, Slack for team comms."
        },
        collaboration: {
            contactPerson: "Jessica (Head of Sales)",
            communicationStyle: "Slack for daily, Zoom for weekly.",
            updateFrequency: "EOD summary in Slack #sales-wins channel.",
            meetings: "Weekly sync on Mondays at 10am EST."
        },
        practical: {
            startDate: "ASAP (Next Monday)",
            hours: "Daily coverage 9am-5pm EST preferred.",
            materials: "Drive link with case studies and VSL assets provided."
        },
        notes: "We are launching a new 'Q4 prep' angle next month. Need setters to be ready for higher volume."
    }
};

export interface StrategyData {
    title: string;
    executiveSummary: string;
    strategicReasoning: {
        whyNow: string;
        expectedImpact: string[];
    };
    phases: {
        title: string;
        items: string[];
    }[];
}

export interface StrategyOption {
    id: string;
    title: string;
    focus: string;
    impact: string;
    description: string;
    steps: string[];
}

export interface AssetBundle {
    viralHooks: string[];
    emailDraft: {
        subject: string;
        body: string;
    };
    headlines: string[];
}
