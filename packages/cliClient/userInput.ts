import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

function getUserInput() {
    const rl = readline.createInterface({ input, output });
    return rl.question('Enter the world you want the definition of');
}
