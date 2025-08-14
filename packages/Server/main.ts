import { server } from './Core/router';

function runServer(port: number) {
    console.log(`Running server and listening on ${port}`);

    server.listen(port);
}

runServer(3000);
