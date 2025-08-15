import * as fs from 'node:fs';
import * as path from 'node:path';

import dotenv from 'dotenv';

export type ServerEnv = Readonly<{
    ollamaBaseUrl: string;
    serverPort: string;
}>;

function resolveEnvPath() {
    const envFilePath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
        return;
    }

    dotenv.config();
}

function createServerEnv(): ServerEnv {}

export function getServerEnv(): ServerEnv {}
