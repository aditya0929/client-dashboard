"use server";

import { ClientProfile, StrategyOption } from "@/lib/types";
import { InferenceClient } from "@huggingface/inference";

export type StrategyOptionsResponse =
    | { success: true; data: StrategyOption[] }
    | { success: false; error: string };

export async function generateStrategyOptionsAction(
    profile: ClientProfile,
    customNotes?: string
): Promise<StrategyOptionsResponse> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        console.error("HF API Error: API key missing.");
        return { success: false, error: "Hugging Face API key is missing on the server." };
    }

    const client = new InferenceClient(apiKey);

    console.log(`HF SDK: Requesting strategy options (Notes: "${customNotes ? "Yes" : "No"}")...`);

    try {
        // Build instruction block
        let instructions = "";
        if (customNotes && customNotes.trim().length > 0) {
            instructions += `\nCONSULTANT NOTES: The user has provided specific strategic direction. Your 3 options MUST reflect this direction: "${customNotes}".\n`;
        }

        const prompt = `You are a senior marketing strategist. Analyze the following client profile and generate 3 DISTINCT strategic options to solve their bottleneck.
    
    Client Profile:
    Name: ${profile.name}
    Industry: ${profile.industry}
    Offer: ${profile.offer}
    Bottleneck: ${profile.currentBottleneck}
    Ideal Customer: ${profile.idealCustomer}
    Funnel Data: ${JSON.stringify(profile.funnelData)}
    
    DEEP CLIENT CONTEXT:
    Company Vision: ${JSON.stringify(profile.onboardingData?.aboutCompany)}
    Primary Goal: ${JSON.stringify(profile.onboardingData?.goals)}
    
    ${instructions}
    
    Return ONLY a valid JSON array containing exactly 3 objects matching this schema, with no additional text or markdown formatting:
    [
      {
        "id": "unique_id_1",
        "title": "The 'Creative Name' Fix",
        "focus": "Short focus keyword (e.g. 'Ads')",
        "impact": "Short impact keyword (e.g. 'Fast ROI')",
        "description": "2 sentence description of what we will do and why.",
        "steps": ["Step 1", "Step 2", "Step 3"]
      },
      ... (2 more options)
    ]`;

        const chatCompletion = await client.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 1500,
            temperature: 0.7,
        });

        let text = chatCompletion.choices[0].message.content;

        if (!text) {
            return { success: false, error: "AI returned empty response." };
        }

        // Clean up potential markdown formatting specific to some models
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        // Find the first '[' and last ']' to extract the JSON array
        const firstOpen = text.indexOf('[');
        const lastClose = text.lastIndexOf(']');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            text = text.substring(firstOpen, lastClose + 1);
        }

        try {
            const data = JSON.parse(text) as StrategyOption[];
            // Ensure 3 options
            if (!Array.isArray(data) || data.length === 0) {
                return { success: false, error: "AI returned invalid data format." };
            }
            return { success: true, data };
        } catch (jsonError) {
            console.error("HF SDK Error: Failed to parse JSON", text);
            return { success: false, error: "AI returned invalid JSON. Please try again." };
        }

    } catch (error: any) {
        console.error("HF SDK Error:", error?.message || error);

        // Handle common "Model is loading" error (503)
        if (error?.toString().includes("503") || error?.toString().includes("loading")) {
            return { success: false, error: "AI Model (Llama-3.1) is warming up. Please wait 30 seconds and try again." };
        }

        return { success: false, error: `AI Error: ${error?.message || "Unknown error"}` };
    }
}
