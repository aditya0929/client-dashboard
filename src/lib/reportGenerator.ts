
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAsFile } from "@/lib/utils";


interface ReportData {
    companyName: string;
    quarter: string;
    measures: string[];
    salesNumbers: { label: string; value: string }[];
    objectivesAchieved: string[];
    objectivesPending: string[];
}

export const generateQuarterlyReport = async (data: ReportData) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        text: `${data.companyName} - Quarterly Strategy Report`,
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 },
                    }),
                    new Paragraph({
                        text: `Period: ${data.quarter}`,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { after: 400 },
                    }),

                    // Section 1: Measures Taken
                    new Paragraph({
                        text: "1. Measures Taken",
                        heading: HeadingLevel.HEADING_3,
                        spacing: { after: 200 },
                    }),
                    ...data.measures.map(measure =>
                        new Paragraph({
                            children: [new TextRun({ text: `• ${measure}` })],
                            spacing: { after: 100 },
                        })
                    ),
                    new Paragraph({ text: "", spacing: { after: 300 } }), // Spacer

                    // Section 2: Sales Numbers
                    new Paragraph({
                        text: "2. Sales Performance",
                        heading: HeadingLevel.HEADING_3,
                        spacing: { after: 200 },
                    }),
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ children: [new TextRun({ text: "Metric", bold: true })] })],
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })] })],
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                    }),
                                ],
                            }),
                            ...data.salesNumbers.map(stat =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(stat.label)] }),
                                        new TableCell({ children: [new Paragraph(stat.value)] }),
                                    ],
                                })
                            ),
                        ],
                    }),
                    new Paragraph({ text: "", spacing: { after: 300 } }), // Spacer

                    // Section 3: Objectives
                    new Paragraph({
                        text: "3. Objectives Status",
                        heading: HeadingLevel.HEADING_3,
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        children: [new TextRun({ text: "Achieved:", bold: true })],
                        spacing: { after: 100 },
                    }),
                    ...data.objectivesAchieved.map(obj =>
                        new Paragraph({
                            children: [new TextRun({ text: `✓ ${obj}` })],
                            spacing: { after: 50 },
                        })
                    ),
                    new Paragraph({ text: "", spacing: { after: 200 } }),

                    new Paragraph({
                        children: [new TextRun({ text: "Yet to be Achieved:", bold: true })],
                        spacing: { after: 100 },
                    }),
                    ...data.objectivesPending.map(obj =>
                        new Paragraph({
                            children: [new TextRun({ text: "☐ " + obj })],
                            spacing: { after: 50 },
                        })
                    ),
                ],
            },
        ],
    });

    const docBlob = await Packer.toBlob(doc);

    // Create a new Blob with the correct MIME type explictly
    const blob = new Blob([docBlob], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

    saveAsFile(blob, `${data.companyName}_${data.quarter}_Report.docx`);
};
