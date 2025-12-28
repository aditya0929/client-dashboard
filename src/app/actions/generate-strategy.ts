"use server";

import { ClientProfile, StrategyData } from "@/lib/types";
import { InferenceClient } from "@huggingface/inference";

export type StrategyResponse =
    | { success: true; data: StrategyData }
    | { success: false; error: string };

export async function generateStrategyAction(
    profile: ClientProfile,
    focus?: string,
    customNotes?: string
): Promise<StrategyResponse> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        console.error("HF API Error: API key missing.");
        return { success: false, error: "Hugging Face API key is missing on the server." };
    }

    const client = new InferenceClient(apiKey);

    // Log the received notes to server console for debugging
    console.log(`HF SDK: Requesting strategy generation. Focus: "${focus || "General"}", Notes: "${customNotes ? "Yes" : "No"}"`);

    try {
        // Build instruction block
        let instructions = "";

        if (focus) {
            instructions += `IMPORTANT FOCUS: The strategy MUST be focused explicitly on this concept: "${focus}". Ensure the title and all phases revolve around this specific fix.\n`;
        }

        if (customNotes && customNotes.trim().length > 0) {
            instructions += `\nCONSULTANT NOTES: The user has provided specific strategic direction. You MUST incorporate the following notes into your plan: "${customNotes}". These are strict instructions from the strategist. The content of the plan MUST reflect these notes.\n`;
        }

        const prompt = `You are a senior marketing strategist. Analyze the following client profile and generate a detailed implementation plan.
    
    Client Profile:
    Name: ${profile.name}
    Industry: ${profile.industry}
    Offer: ${profile.offer}
    Bottleneck: ${profile.currentBottleneck}
    Ideal Customer: ${profile.idealCustomer}
    Funnel Data: ${JSON.stringify(profile.funnelData)}
    
    DEEP CLIENT CONTEXT (MUST INFLUENCE STRATEGY):
    About Company: ${JSON.stringify(profile.onboardingData?.aboutCompany)}
    Goals: ${JSON.stringify(profile.onboardingData?.goals)}
    Tone of Voice: ${JSON.stringify(profile.onboardingData?.toneOfVoice)}
    
    ${instructions}
    
    Return ONLY a valid JSON object matching this exact schema, with no additional text or markdown formatting:
    {
        "title": "A catchy title for the strategy",
        "executiveSummary": "2-3 sentences summarizing the pivot",
        "strategicReasoning": {
            "whyNow": "Why this is the right time",
            "expectedImpact": ["Impact 1", "Impact 2", "Impact 3"]
        },
        "phases": [
            {
                "title": "Phase 1 Title",
                "items": ["Action item 1", "Action item 2", "Action item 3"]
            },
            {
                "title": "Phase 2 Title",
                "items": ["Action item 1", "Action item 2", "Action item 3"]
            }
        ]
    }`;

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

        console.log("HF SDK: Received response length:", text?.length);

        if (!text) {
            return { success: false, error: "AI returned empty response." };
        }

        // Clean up potential markdown formatting specific to some models
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        // Find the first '{' and last '}' to extract the JSON object
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            text = text.substring(firstOpen, lastClose + 1);
        }

        try {
            const data = JSON.parse(text) as StrategyData;
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
