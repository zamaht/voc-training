import * as fs from 'node:fs';
import * as path from 'node:path';

import dotenv from 'dotenv';
import { z } from 'zod';

const BaseOpenAiUrl = z.string().url().endsWith('v1').brand('open_ai');
export type BaseOpenAiUrl = z.infer<typeof BaseOpenAiUrl>;

const ServerPort = z.string().brand('server_port');
export type ServerPort = z.infer<typeof ServerPort>;

const OpenAiApiKey = z.string().brand('api_key');
export type OpenAiApiKey = 'ollama' | z.infer<typeof OpenAiApiKey>;

export type ServerEnv = Readonly<{
    ollamaBaseUrl: BaseOpenAiUrl;
    serverPort: ServerPort;
}>;

function resolveEnvPath() {
    const envFilePath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
        return;
    }

    console.log('Env file not found, falling back to ./.env');
    dotenv.config();
}

const serverEnv = createServerEnv();

function createServerEnv(): ServerEnv {
    resolveEnvPath();

    const env = `
DEBUG Env variables

OLLAMA_BASE_URL= ${process.env.OLLAMA_BASE_URL}
SERVER_PORT= ${process.env.SERVER_PORT}
`;
    return Object.freeze({
        ollamaBaseUrl: BaseOpenAiUrl.parse(process.env.OLLAMA_BASE_URL),
        serverPort: ServerPort.parse(process.env.SERVER_PORT),
    });
}

export function getServerEnv(): ServerEnv {
    return serverEnv;
}
