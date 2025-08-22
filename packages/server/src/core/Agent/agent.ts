import OpenAi from 'openai';
import { z } from 'zod';

import type { BaseOpenAiUrl, OpenAiApiKey } from '@packages/server/src/core/serverEnv';

type AgentModel = 'llama2' | 'tinyllama';

export const SystemPrompt = z.string().brand('system_prompt');
export type SystemPrompt = z.infer<typeof SystemPrompt>;

type AgentConfig = {
    baseUrl: BaseOpenAiUrl;
    model: AgentModel;
    apiKey: OpenAiApiKey;
    basePrompt: SystemPrompt;
};

export class Agent {
    private client: OpenAi;
    private model: AgentModel;
    private basePrompt: SystemPrompt;

    constructor(agentConfig: AgentConfig) {
        this.client = new OpenAi({
            baseURL: agentConfig.baseUrl,
            apiKey: agentConfig.apiKey,
        });

        this.model = agentConfig.model;
        this.basePrompt = agentConfig.basePrompt;
    }

    public async ask(inputMessage: string): Promise<string | null> {
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: 'system', content: this.basePrompt },
                { role: 'user', content: inputMessage },
            ],
        });

        return response.choices[0].message.content;
    }
}
