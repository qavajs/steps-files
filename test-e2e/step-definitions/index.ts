import { Then, When, After } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import * as fs from 'fs-extra';
import * as path from 'path';

declare global {
    var config: any;
}

When('I drop file {string} to {string} after {int} ms', async function (file, dir, delay) {
    setTimeout(() => {
        fs.writeFileSync(path.join(dir, file), 'content', 'utf-8')
    }, delay);
});

After(async function () {
    fs.emptydirSync('./test-e2e/folder');
});



