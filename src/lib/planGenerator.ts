
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAsFile } from "@/lib/utils";
import { ClientProfile, StrategyData } from "@/lib/types";

export const generateImplementationPlan = async (profile: ClientProfile, strategy: StrategyData) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // Title Page / Header
                    new Paragraph({
                        text: strategy.title, // Dynamic Title
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                    }),
                    new Paragraph({
                        text: `Date: ${new Date().toLocaleDateString()}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 },
                    }),
                    new Paragraph({
                        text: `Prepared For: ${profile.name}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                    }),

                    // 1. Executive Summary
                    new Paragraph({
                        text: "1. Executive Summary",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200, before: 200 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun(strategy.executiveSummary),
                        ],
                        spacing: { after: 300 },
                    }),

                    // 2. Strategic Reasoning & Impact
                    new Paragraph({
                        text: "2. Strategic Reasoning & Impact",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200, before: 200 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Why Now? ", bold: true }),
                            new TextRun(strategy.strategicReasoning.whyNow),
                        ],
                        spacing: { after: 100 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Expected KPIs:", bold: true }),
                        ],
                        spacing: { after: 100 },
                    }),
                    ...strategy.strategicReasoning.expectedImpact.map(impact =>
                        new Paragraph({
                            text: `• ${impact}`,
                            bullet: { level: 0 },
                        })
                    ),

                    // 3. Implementation Phases
                    new Paragraph({
                        text: "3. Implementation Phases",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200, before: 300 },
                    }),
                    ...strategy.phases.flatMap(phase => [
                        new Paragraph({
                            text: phase.title,
                            heading: HeadingLevel.HEADING_2,
                            spacing: { after: 100, before: 100 },
                        }),
                        ...phase.items.map(item =>
                            new Paragraph({
                                text: `• ${item}`,
                                bullet: { level: 0 },
                            })
                        ),
                        new Paragraph({ text: "", spacing: { after: 200 } }) // Spacer
                    ]),
                ],
            },
        ],
    });

    const docBlob = await Packer.toBlob(doc);
    const blob = new Blob([docBlob], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAsFile(blob, `${profile.name.replace(/\s+/g, "_")}_Implementation_Plan.docx`);
};
