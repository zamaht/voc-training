import OpenAi from 'openai';
import { z } from 'zod';

import { ServerError } from '../error';
import { resolveEnvPath } from '../utils';

export const BaseOpenAiUrl = z.string().url().endsWith('v1').brand('open_ai');
export type BaseOpenAiUrl = z.infer<typeof BaseOpenAiUrl>;

type AgentModel = 'llama2';

export const ApiKey = z.string().brand('api_key');
export type ApiKey = 'ollama' | z.infer<typeof ApiKey>;

export const SystemPrompt = z.string().brand('system_prompt');
export type SystemPrompt = z.infer<typeof SystemPrompt>;

type AgentConfig = {
    baseUrl: BaseOpenAiUrl;
    model: AgentModel;
    apiKey: ApiKey;
    basePrompt: SystemPrompt;
};

export class Agent {
    client: OpenAi;
    model: AgentModel;
    constructor(agentConfig: AgentConfig) {
        this.client = new OpenAi({
            baseURL: agentConfig.baseUrl,
            apiKey: agentConfig.apiKey,
        });

        this.model = agentConfig.model;
    }

    public async ask(inputMessage: string) {
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [{ role: 'user', content: inputMessage }],
        });
    }
}
