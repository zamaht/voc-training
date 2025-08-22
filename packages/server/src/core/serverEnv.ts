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

const PostgresHost = z.string().brand('postgres_host');
export type PostgresHost = z.infer<typeof PostgresHost>;

const PostgresUrl = z.string().brand('postgres_url');
export type PostgresUrl = z.infer<typeof PostgresUrl>;

const PostgresPassword = z.string().brand('postgres_password');
export type PostgresPassword = z.infer<typeof PostgresPassword>;

const PostgresUser = z.string().brand('postgres_user');
export type PostgresUser = z.infer<typeof PostgresUser>;

const PostgresDb = z.string().brand('postgres_db');
export type PostgresDb = z.infer<typeof PostgresDb>;

const PostgresPort = z.string().brand('postgres_port');
export type PostgresPort = z.infer<typeof PostgresPort>;

function resolveEnvPath() {
    const envFilePath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
        return;
    }

    console.log('Env file not found, falling back to ./.env');
    dotenv.config();
}

type PostgresEnv = Readonly<{
    host: PostgresHost;
    user: PostgresUser;
    password: PostgresPassword;
    db: PostgresDb;
    port: PostgresPort;
}>;

export type ServerEnv = Readonly<{
    ollamaBaseUrl: BaseOpenAiUrl;
    serverPort: ServerPort;
}>;

type AppEnv = {
    public: ServerEnv;
    postgres: {
        url: PostgresUrl;
    };
};

const env = createAppEnv();

function createAppEnv(): AppEnv {
    resolveEnvPath();

    const { host, db, password, port, user } = {
        host: PostgresHost.parse(process.env.POSTGRES_HOST),
        db: PostgresDb.parse(process.env.POSTGRES_DB),
        password: PostgresPassword.parse(process.env.POSTGRES_PASSWORD),
        port: PostgresPort.parse(process.env.POSTGRES_PORT),
        user: PostgresUser.parse(process.env.POSTGRES_USER),
    } as const satisfies PostgresEnv;

    return Object.freeze({
        public: {
            ollamaBaseUrl: BaseOpenAiUrl.parse(process.env.OLLAMA_BASE_URL),
            serverPort: ServerPort.parse(process.env.SERVER_PORT),
        },
        postgres: {
            url: PostgresUrl.parse(`psql://${user}:${password}@${host}:${port}/${db}`),
        },
    } as const satisfies AppEnv);
}

export function getServerEnv(): ServerEnv {
    return env.public;
}

export function postgresUrl(): PostgresUrl {
    return env.postgres.url;
}
