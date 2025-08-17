import { z } from 'zod';

import { getServerEnv } from '@packages/server/src/Core/serverEnv';

import { Agent, SystemPrompt } from '@packages/server/src/Core/Agent/agent';

import { DEFINITION_FINDER_SYSTEM_PROMPT } from './prompt';

export const Word = z.string().brand('word');
export type Word = z.infer<typeof Word>;

export const Definition = z.string().brand('definition');
export type Definition = z.infer<typeof Definition>;

export async function getWordDefinition(word: Word) {
    const serverEnv = getServerEnv();
    console.log(`SEVER ENV= ${serverEnv}`);
    const agent = new Agent({
        basePrompt: SystemPrompt.parse(DEFINITION_FINDER_SYSTEM_PROMPT),
        baseUrl: serverEnv.ollamaBaseUrl,
        model: 'llama2',
        apiKey: 'ollama',
    });
    return await agent.ask(`Find the best sentence that defines the following word: ${word}`);
}
