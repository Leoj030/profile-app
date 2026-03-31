import { Groq } from "groq-sdk";
import { extractTextPrompt } from "./prompts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const GPT_MODEL = "openai/gpt-oss-120b";
const LLAMA_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

export async function extractTextToJson(imgUrl: string, prompt: string) {
    const response = await groq.chat.completions.create({
        model: LLAMA_MODEL,
        temperature: 0.1,
        stream: false,
        response_format: { type: "json_object" },

        messages: [{
            role: "user",
            content: [
                {
                    type: "text",
                    text: prompt 
                },
                {
                    type: "image_url",
                    image_url: {
                        url: `${imgUrl}`
                    },
                },
            ]
        }]
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content returned from AI");
    return JSON.parse(content);
}

export async function aiAnalysis(textContent: string, prompt: string) {
    const response = await groq.chat.completions.create({
        model: GPT_MODEL,
        temperature: 0.1,
        stream: false,
        response_format: { type: "json_object" },

        messages: [{
            role: "user",
            content: [
                {
                    type: "text",
                    text: `${prompt}\n\n Resume Content: ${JSON.stringify(textContent)}`, 
                }
            ]
        }]
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content returned from AI");
    return JSON.parse(content);
}

export async function aiAnalysis2(imgUrl: string, prompt: string) {
    const response = await groq.chat.completions.create({
        model: LLAMA_MODEL,
        temperature: 0.1,
        stream: false,
        response_format: { type: "json_object" },

        messages: [{
            role: "user",
            content: [
                {
                    type: "text",
                    text: prompt 
                },
                {
                    type: "image_url",
                    image_url: {
                        url: `${imgUrl}`
                    },
                },
            ]
        }]
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content returned from AI");
    return JSON.parse(content);
}