import { GoogleGenAI } from "@google/genai";

export class GeminiProvider {
  private ai: GoogleGenAI;

  constructor() {
    console.log("GEMINI_API_KEY:" + process.env.GEMINI_API_KEY);
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  async generateAnalysis(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text ?? "Nenhuma resposta gerada";
  }
}
