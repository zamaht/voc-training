export class ServerError extends Error {
    constructor(message: string) {
        super(`Internal error: ${message}`);
    }
}
