import { getServerEnv } from '@packages/server/src/core/serverEnv';
import { httpServer } from '@packages/server/src/router';
import { AppDataSource } from './ormconfig';

async function runServer() {
    const serverEnv = getServerEnv();

    try {
        await AppDataSource.initialize();
        console.log('Db started');
        httpServer.listen(serverEnv.serverPort);
    } finally {
        await AppDataSource.destroy();
    }
}

runServer();
