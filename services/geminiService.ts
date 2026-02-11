
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock response for Gemini API.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

export async function generateRoomTopic(roomName: string): Promise<string> {
    const prompt = `Gere um tópico de conversa curto, criativo e com um toque futurista para uma sala de bate-papo chamada "${roomName}". O tópico deve ser sobre cultura, tecnologia, ou eventos atuais, preferencialmente com um toque relacionado à cultura do Maranhão, se apropriado. Responda apenas com o tópico.`;

    if (!ai) {
        // Mock response if API key is not available
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        return `O que você mais gosta em ${roomName}?`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        if (response.text) {
            return response.text.trim();
        }
        return `Bem-vindo à sala ${roomName}!`;

    } catch (error) {
        console.error("Error generating topic with Gemini API:", error);
        return `O que torna ${roomName} especial para você?`; // Fallback topic
    }
}
