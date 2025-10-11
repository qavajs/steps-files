import { Then, When, After } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { join } from 'node:path';
import { expect } from '@qavajs/validation';
import { writeFileSync, existsSync, readdirSync, unlinkSync, mkdirSync } from "node:fs";

When('I drop file {string} to {string} after {int} ms', function (file, dir, delay) {
    setTimeout(() => {
        existsSync(dir) || mkdirSync(dir);
        writeFileSync(join(dir, file), 'content', 'utf-8')
    }, delay);
});

Then('I expect {string} memory value to be equal {string}', function (actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(actualValue).toDeepEqual(expectedValue);
});

Then('I expect {string} memory value to contain {string}', function (actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(actualValue).toContain(expectedValue);
});

After(function () {
    const dir = './test-e2e/folder';
    readdirSync(dir).forEach(f => unlinkSync(`${dir}/${f}`));
});
