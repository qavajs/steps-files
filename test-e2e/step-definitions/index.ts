import {Then, When, After, type MemoryValue, type Validation} from '@qavajs/core';
import {join} from 'node:path';
import {writeFileSync, existsSync, readdirSync, unlinkSync, mkdirSync} from "node:fs";

When('I drop file {string} to {string} after {int} ms', function (file, dir, delay) {
    setTimeout(() => {
        existsSync(dir) || mkdirSync(dir);
        writeFileSync(join(dir, file), 'content', 'utf-8')
    }, delay);
});

Then('I expect {value} memory value {validation} {value}',
    function (actual: MemoryValue, validate: Validation, expected: MemoryValue) {
        const actualValue = actual.value();
        const expectedValue = expected.value();
        validate(actualValue, expectedValue);
    }
);

After(function () {
    const dir = './test-e2e/folder';
    readdirSync(dir).forEach(f => unlinkSync(`${dir}/${f}`));
});
