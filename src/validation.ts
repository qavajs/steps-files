import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import fs from 'node:fs/promises';
import { getValidation } from '@qavajs/validation';

declare global {
    var config: any;
}

/**
 * Verify that file content satisfy validation
 * @param {string} file - file path
 * @param {string} validationType - validation
 * @param {string} expectedValue - expected value
 * @example
 * When I expect './folder/file.txt' text file content to be equal 'file content'
 * When I expect '$filePath' text file content to contain '$content'
 */
When('I expect {string} text file content {fileValidation} {string}', async function (file, validationType, expectedValue) {
    const fileName = memory.getValue(file);
    const expected = memory.getValue(expectedValue);
    const validation = getValidation(validationType);
    const fileContent = await fs.readFile(fileName, 'utf-8');
    validation(fileContent, expected);
});
