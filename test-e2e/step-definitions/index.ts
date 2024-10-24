import { Then, When, After } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import * as path from 'path';
import { expect } from 'chai';
import {writeFileSync, readdirSync} from "node:fs";
import {unlinkSync} from "fs-extra";

When('I drop file {string} to {string} after {int} ms', async function (file, dir, delay) {
    setTimeout(() => {
        writeFileSync(path.join(dir, file), 'content', 'utf-8')
    }, delay);
});

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(actualValue).to.eql(expectedValue);
});

Then('I expect {string} memory value to contain {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(actualValue).to.contain(expectedValue);
});

After(async function () {
    const dir ='./test-e2e/folder';
    readdirSync(dir).forEach(f => unlinkSync(`${dir}/${f}`));
});



