import { ServerError } from './Core/error';
import { httpServer } from './router';

function runServer() {
    const port = process.env.SERVER_PORT;
    if (!port) {
        throw new ServerError('SERVER_PORT not set in env');
    }
    console.log(`Running server and listening on ${port}`);

    httpServer.listen(port);
}

runServer();
