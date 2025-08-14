import OpenAi from 'openai';
import { z } from 'zod';

export const Word = z.string().brand('word');
export type Word = z.infer<typeof Word>;

export const Definition = z.string().brand('definition');
export type Definition = z.infer<typeof Definition>;

export async function getWordDefinition(word: Word) {
    const client = new OpenAi({
        baseURL: 'http://localhost:11434/v1',
        apiKey: 'ollama',
    });

    const response = await client.chat.completions.create({
        model: 'llama2',
        messages: [{ role: 'user', content: word }],
    });
    return response.choices[0].message.content;
}
