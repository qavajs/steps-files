import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import fs from 'fs/promises';
import xlsx from 'xlsx';

/**
 * Save file content to memory as buffer
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.txt' file content as 'fileContent'
 * When I save '$filePath' file content as 'fileContent'
 */
When('I save {string} file content as {string}', async function (file, memoryKey) {
    const filePath = memory.getValue(file);
    const fileContent = await fs.readFile(filePath);
    memory.setValue(memoryKey, fileContent);
});

/**
 * Save text file content to memory as text (utf-8)
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.txt' text file content as 'fileContent'
 * When I save '$filePath' text file as 'fileContent'
 */
When('I save {string} text file content as {string}', async function (file, memoryKey) {
    const filePath = memory.getValue(file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    memory.setValue(memoryKey, fileContent);
});

/**
 * Save file content to memory as Excel object (https://www.npmjs.com/package/xlsx)
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.xls' Excel file content as 'excelContent'
 * When I save '$filePath' Excel file content as 'excelContent'
 */
When('I save {string} Excel file content as {string}', async function (file, memoryKey) {
    const filePath = memory.getValue(file);
    const fileContent = await fs.readFile(filePath);
    const excelContent = xlsx.read(fileContent);
    memory.setValue(memoryKey, excelContent);
});

