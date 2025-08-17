import { getServerEnv } from '@packages/server/src/Core/serverEnv';
import { httpServer } from '@packages/server/src/router';

function runServer() {
    const serverEnv = getServerEnv();
    httpServer.listen(serverEnv.serverPort);
}

runServer();
