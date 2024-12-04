import { When } from '@cucumber/cucumber';
import { MemoryValue } from '@qavajs/core';
import { waitFor } from './waitFor';
import { constants, accessSync, readdirSync, readFileSync } from 'node:fs';

/**
 * Verify that file content satisfy validation
 * @param {string} file - file path
 * @param {string} validation - validation
 * @param {string} expectedValue - expected value
 * @example
 * When I expect './folder/file.txt' text file content to be equal 'file content'
 * When I expect '$filePath' text file content to contain '$content'
 */
When('I expect {value} text file content {validation} {value}', async function (file: MemoryValue, validation, expectedValue: MemoryValue) {
    const fileName = await file.value();
    const expected = await expectedValue.value();
    const fileContent = readFileSync(fileName, 'utf-8');
    validation(fileContent, expected);
});

/**
 * Expect file matching regexp to exist directory
 * @param {string} file - regexp pattern of file name to wait
 * @param {string} dir - folder path
 * @example
 * When I expect file matching 'f.+\.txt' regexp exists in './test-e2e/folder'
 * When I expect file matching '$fileRegexp' regexp exists in '$folder'
 */
When('I expect file matching {value} regexp exists in {value}', async function (file: MemoryValue, dir: MemoryValue) {
    const fileNameRegexp = new RegExp(await file.value());
    const dirName = await dir.value();
    await waitFor(function () {
        const fileList = readdirSync(dirName);
        return fileList.find(f => fileNameRegexp.test(f)) ?? false;
    }, {
        interval: this.config.fileTimeout?.interval,
        timeout: this.config.fileTimeout?.timeout
    });
});

/**
 * Expect file to exist
 * @param {string} file - file path to wait
 * @example
 * When I expect './test-e2e/folder/file.txt' file exists
 * When I expect '$filePath' file exists
 */
When('I expect {value} file exists', async function (file: MemoryValue) {
    const fileName = await file.value();
    await waitFor(function () {
        try {
            accessSync(fileName, constants.F_OK);
            return true
        } catch (err) {
            return false
        }
    }, {
        interval: this.config.fileTimeout?.interval,
        timeout: this.config.fileTimeout?.timeout
    });
});

