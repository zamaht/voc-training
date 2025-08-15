import cors from 'cors';

import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { Word, getWordDefinition } from './Domain/VocabBuilder/public';
import { ServerError } from './Core/error';
import type { ServerContext } from './Core/types';

const t = initTRPC.create();

export const router = t.router({
    getWordDefinition: t.procedure.input(Word).query(({ input }) => getWordDefinition(input)),
});

export const httpServer = createHTTPServer({
    middleware: cors(),
    router,
});

export type AppRouter = typeof router;
