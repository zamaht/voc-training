import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@packages/server/src/router';

const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

async function runClient() {
    return await trpc.getWordDefinition.query('test');
}

runClient().then((value) => console.log(value));
