export const DEMO_CLIENT = {
    companyName: "EcomScale Academy",
    industry: "Online Education (E-commerce)",
    decisionMaker: "Alex Rivera (Founder)",
    coreOffer: "dropshipping Mentorship + Step-by-Step Plan",
    dealSize: "$3,800",
    salesCycle: "1-2 Weeks",
    icp: {
        roles: ["Aspiring Entrepreneurs", "Side Hustlers"],
        size: "Individuals (B2C)",
        painPoints: "Manual tracking of 'Story-to-Call' paths is error-prone. Losing leads in DM chaos. Data discrepancies between setters.",
        whyBuy: "Centralizes all data inputs, minimizes manual counting, and provides predictive insights."
    },
    goals: {
        primary: "Automated Data Centralization",
        monthlyCallTarget: 120, // Higher volume for B2C
        quarterlyRevenue: "$250k New Revenue",
        constraints: "Avoid 'bot-like' automated DMs. Maintain personal high-touch feel while automating the data."
    },
    readinessScore: 85,
    riskFlags: [
        { label: "Data Fragmentation", frequency: "High", color: "amber" },
        { label: "Manual Setter Reliance", frequency: "High", color: "rose" }
    ]
};

export const TRACKING_DATA = [
    { week: "Week 1", dates: "Mar 1 - Mar 7", conversations: 312, proposals: 28, booked: 18, revenue: 0 },
    { week: "Week 2", dates: "Mar 8 - Mar 14", conversations: 345, proposals: 35, booked: 22, revenue: 0 },
    { week: "Week 3", dates: "Mar 15 - Mar 21", conversations: 298, proposals: 25, booked: 15, revenue: 0 }, // Slight dip
    { week: "Week 4", dates: "Mar 22 - Mar 28", conversations: 410, proposals: 48, booked: 32, revenue: 0 }, // Strong finish
];

export const CHANNEL_DATA = [
    { name: "LinkedIn", value: 55, color: "#0077b5" },
    { name: "Cold Email", value: 35, color: "#8b5cf6" },
    { name: "Referrals", value: 10, color: "#f97316" },
];

// Aggregated stats for Funnel Overview
export const FUNNEL_STATS = {
    conversations: 1365,
    proposals: 136,
    booked: 87,
    conv_conv_prop: "10%",
    conv_prop_book: "64%"
};

export const MONTHLY_REPORT = {
    month: "March 2024",
    executiveSummary: "March was a breakout month for TechFlow. We successfully penetrated the 'Mid-Market CFO' segment, validating the new 'Audit-First' messaging angle. While volume dipped slightly in Week 3 due to a LinkedIn algorithm update, we recovered strongly in Week 4, ending with 87 qualified meetings booked—our highest monthly total to date.",
    whatWorked: [
        "**The 'Audit-First' Angle:** pivoting from 'Reconciliation Tool' to 'Month-End Audit Partner' increased C-Suite response rates by 22%.",
        "**CFO Peer Case Studies:** Sharing the 'FinCorp' case study in follow-ups revived 12 stalled conversations.",
        "**Tiered Follow-Up:** Implementing a 'soft touch' nurture sequence for non-responders generated 8 bonus bookings."
    ],
    bottlenecks: [
        "**Technical Q&A Delays:** Setters are getting stuck on complex integration questions (ERP compatibility), doubling response times.",
        "**Email Deliverability:** Open rates on the secondary domain dropped to 35% in Week 3."
    ],
    missedOpportunities: "We had 18 warm leads ask for 'Compliance Specs' that we didn't have ready on hand. Having a 'Security One-Pager' pre-loaded could have accelerated these bookings by ~1 week.",
    focusNextMonth: "Equip setters with a 'Technical Cheat Sheet' and 'Security Assets' to handle objections instantly. Launch 2 new sending domains to stabilize email volume.",
    projection: "Based on the Week 4 surge (32 bookings), we are pacing to hit **110+ bookings** in April if we maintain current setter efficiency."
};
