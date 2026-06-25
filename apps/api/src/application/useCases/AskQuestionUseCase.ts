import { GeminiProvider } from "@infrastructure/ai/GeminiProvider";
/* este é mock  */
export class AskQuestionUseCase {
  constructor(private readonly aiProvider: GeminiProvider) {}

  async execute(question: string): Promise<string> {
    const regionData = {
      region: "Zona Norte",
      coverage5g: 15,
      trainingPrograms: 2,
      unemploymentRate: 18,
    };

    const prompt = `
Você é um especialista em políticas públicas.

Pergunta:
${question}

Dados:
${JSON.stringify(regionData, null, 2)}

Analise os dados e responda em português.
`;

    return this.aiProvider.generateAnalysis(prompt);
  }
}
