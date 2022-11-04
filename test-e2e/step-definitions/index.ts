import { Then, When, After } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import * as fs from 'fs-extra';
import * as path from 'path';
import { expect } from 'chai';

declare global {
    var config: any;
}

When('I drop file {string} to {string} after {int} ms', async function (file, dir, delay) {
    setTimeout(() => {
        fs.writeFileSync(path.join(dir, file), 'content', 'utf-8')
    }, delay);
});

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

After(async function () {
    fs.emptydirSync('./test-e2e/folder');
});



