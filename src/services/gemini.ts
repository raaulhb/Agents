import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});
const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "transcreva o audio para o portugues do Brasil. Seja preciso e natural na transcricao. Mantenha a pontuacao adequada e divida o texto em paragrafos quando for apropriado.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });
  if (!response.text) {
    throw new Error("Nao foi possivel converter o audio");
  }
  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error("Nao foi possivel gerar os embedings");
  }
  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join("\n\n");

  const prompt = `
  Com base no contexto abaixo, responda a pergunta de forma clara e objetiva em portugues do Brasil.
  
  CONTEXTO: 
  ${context}

  PERGUNTA:
  ${question}

  INSTRUCOES:
  - Use apenas informacoes do context enviado;
  - Se a resposta nao for encontrada no contexto, responda "Nao sei";
  - Seja objetivo na resposta;
  - Mantenha um tom educativo e profissional;
  - Se for citar o contexto, utilize o termo "conteudo da aula";
  `.trim();
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
      {
        text: question,
      },
    ],
  });
  if (!response.text) {
    throw new Error("Falha ao gerar a resposta pelo Gmini");
  }
  return response.text;
}
