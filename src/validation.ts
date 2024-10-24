import {When} from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import {readFileSync} from "node:fs";

/**
 * Verify that file content satisfy validation
 * @param {string} file - file path
 * @param {string} validation - validation
 * @param {string} expectedValue - expected value
 * @example
 * When I expect './folder/file.txt' text file content to be equal 'file content'
 * When I expect '$filePath' text file content to contain '$content'
 */
When('I expect {value} text file content {validation} {string}', function (file, validation, expectedValue) {
    const fileName = memory.getValue(file).value();
    const expected = memory.getValue(expectedValue);
    const fileContent = readFileSync(fileName, 'utf-8');
    validation(fileContent, expected);
});
