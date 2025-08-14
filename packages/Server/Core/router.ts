import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { Word, getWordDefinition } from '../Domain/Dictionary/public';

const t = initTRPC.create();

export const appRouter = t.router({
    getWordDefinition: t.procedure.input(Word).query(({ input }) => getWordDefinition(input)),
});

export const server = createHTTPServer({
    router: appRouter,
});

export type AppRouter = typeof appRouter;
