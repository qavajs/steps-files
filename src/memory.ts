import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import fs from 'fs/promises';
import xlsx from 'xlsx';
import parsePdf from './pdf';
import parseDocx from './word';
import { getFileContent } from './utils';

/**
 * Save file content to memory as buffer
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.txt' file content as 'fileContent'
 * When I save '$filePath' file content as 'fileContent'
 */
When('I save {string} file content as {string}', async function (file, memoryKey) {
    const filePath = await memory.getValue(file);
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
    const filePath = await memory.getValue(file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    memory.setValue(memoryKey, fileContent);
});

/**
 * Save file content to memory as Excel object (https://www.npmjs.com/package/xlsx)
 * @param {string} file - file path or file buffer
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.xls' Excel file content as 'excelContent'
 * When I save '$filePath' Excel file content as 'excelContent'
 * When I save '$fileBuffer' Excel file content as 'excelContent'
 */
When('I save {string} Excel file content as {string}', async function (file, memoryKey) {
    const filePathOrContent = await memory.getValue(file);
    const fileContent = await getFileContent(filePathOrContent);
    const excelContent = xlsx.read(fileContent);
    memory.setValue(memoryKey, excelContent);
});

/**
 * Save file content to memory as pdf object
 * @param {string} file - file path or file buffer
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.pdf' pdf file content as 'pdfContent'
 * When I save '$filePath' pdf file content as 'pdfContent'
 * When I save '$fileBuffer' pdf file content as 'pdfContent'
 */
When('I save {string} pdf file content as {string}', async function (file, memoryKey) {
    const filePathOrContent = await memory.getValue(file);
    const fileContent = await getFileContent(filePathOrContent);
    const pdfData = await parsePdf(new Uint8Array(fileContent));
    memory.setValue(memoryKey, pdfData);
});

/**
 * Save file content to memory as Word object
 * @param {string} file - file path or file buffer
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.docx' Word file content as 'wordContent'
 * When I save '$filePath' Word file content as 'wordContent'
 * When I save '$fileBuffer' Word file content as 'wordContent'
 */
When('I save {string} Word file content as {string}', async function (file, memoryKey) {
    const filePathOrContent = await memory.getValue(file);
    const fileContent = await getFileContent(filePathOrContent);
    const pdfData = await parseDocx(fileContent);
    memory.setValue(memoryKey, pdfData);
});

/**
 * Save file content to memory as csv object
 * First row in csv will be considered as header containing keys
 * @param {string} file - file path or file buffer
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.xls' csv file content as 'excelContent'
 * When I save '$filePath' csv file content as 'excelContent'
 * When I save '$fileBuffer' csv file content as 'excelContent'
 */
When('I save {string} csv file content as {string}', async function (file, memoryKey) {
    const filePathOrContent = await memory.getValue(file);
    const fileContent = await getFileContent(filePathOrContent);
    const excelContent = xlsx.read(fileContent);
    memory.setValue(memoryKey, xlsx.utils.sheet_to_json(excelContent.Sheets.Sheet1));
});
