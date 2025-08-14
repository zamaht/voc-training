import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../Server/Core/router';

const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

function runClient() {
    const response = trpc.getWordDefinition.query('test');
    console.log(response);
}

runClient();
