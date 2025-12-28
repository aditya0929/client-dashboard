"use server";

import { ClientProfile, AssetBundle } from "@/lib/types";
import { InferenceClient } from "@huggingface/inference";

export type AssetsResponse =
    | { success: true; data: AssetBundle }
    | { success: false; error: string };

export async function generateAssetsAction(
    profile: ClientProfile,
    customNotes?: string
): Promise<AssetsResponse> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        console.error("HF API Error: API key missing.");
        return { success: false, error: "Hugging Face API key is missing on the server." };
    }

    const client = new InferenceClient(apiKey);

    console.log(`HF SDK: Requesting asset generation (Notes: "${customNotes ? "Yes" : "No"}")...`);

    try {
        let instructions = "";
        if (customNotes && customNotes.trim().length > 0) {
            instructions += `\nSTRATEGY CONTEXT: The assets MUST directly align with this strategic direction: "${customNotes}".\n`;
        }

        const prompt = `You are a world-class copywriter. Generate high-converting marketing assets for a client.
    
    Client Profile:
    Name: ${profile.name}
    Industry: ${profile.industry}
    Offer: ${profile.offer}
    Bottleneck: ${profile.currentBottleneck}
    Ideal Customer: ${profile.idealCustomer}
    
    DEEP CLIENT CONTEXT (STYLE & TONE):
    Tone of Voice: ${JSON.stringify(profile.onboardingData?.toneOfVoice)}
    Goals: ${JSON.stringify(profile.onboardingData?.goals)}
    Pain Points: ${JSON.stringify(profile.onboardingData?.aboutCompany?.painPoints)}
    
    ${instructions}
    
    Return ONLY a valid JSON object matching this exact schema, with no additional text, markdown, or code blocks:
    {
        "viralHooks": [
            "Hook 1 (short, punchy, curiosity-inducing)",
            "Hook 2 (contrarian or surprising)",
            "Hook 3 (value-driven)"
        ],
        "emailDraft": {
            "subject": "Compelling Subject Line",
            "body": "The full email body text. Use \\n for line breaks."
        },
        "headlines": [
            "Ad Headline 1",
            "Ad Headline 2",
            "Ad Headline 3"
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

        if (!text) {
            return { success: false, error: "AI returned empty response." };
        }

        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        // Find the first '{' and last '}' to extract the JSON object
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            text = text.substring(firstOpen, lastClose + 1);
        }

        try {
            const data = JSON.parse(text) as AssetBundle;
            return { success: true, data };
        } catch (jsonError) {
            console.error("HF SDK Error: Failed to parse JSON", text);
            return { success: false, error: "AI returned invalid JSON. Please try again." };
        }

    } catch (error: any) {
        console.error("HF SDK Error:", error?.message || error);

        if (error?.toString().includes("503") || error?.toString().includes("loading")) {
            return { success: false, error: "AI Model is warming up. Please wait 30 seconds and try again." };
        }

        return { success: false, error: `AI Error: ${error?.message || "Unknown error"}` };
    }
}
