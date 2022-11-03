import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import fs from 'fs/promises';
import { getValidation } from '@qavajs/validation';
declare global {
    var config: any;
}

/**
 * Wait until file matching regexp appear in directory
 * @param {string} file - regexp pattern of file name to wait
 * @param {string} dir - folder path
 * @example
 * When I wait until file matching 'f.+\.txt' regexp appears in './test-e2e/folder'
 * When I wait until file matching '$fileRegexp' regexp appears in '$folder'
 */
When('I expect {string} text file content {fileValidation} {string}', async function (file, validationType, expectedValue) {
    const fileName = memory.getValue(file);
    const expected = memory.getValue(expectedValue);
    const validation = getValidation(validationType);
    const fileContent = await fs.readFile(fileName, 'utf-8');
    validation(fileContent, expected);
});
