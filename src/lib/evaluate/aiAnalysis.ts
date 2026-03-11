import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function aiAnalysis(imgUrl: string, prompt: string) {
    const response = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
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
