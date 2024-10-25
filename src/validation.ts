import {When} from '@cucumber/cucumber';
import {readFileSync} from "node:fs";
import {MemoryValue} from "@qavajs/core/src/load";

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
