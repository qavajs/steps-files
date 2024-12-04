import { When } from '@cucumber/cucumber';
import { readFileSync } from 'node:fs';
import xlsx from 'xlsx';
import parsePdf from './pdf';
import parseDocx from './word';
import { getFileContent } from './utils';
import { MemoryValue } from "@qavajs/core";

/**
 * Save file content to memory as buffer
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.txt' file content as 'fileContent'
 * When I save '$filePath' file content as 'fileContent'
 */
When('I save {value} file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePath = await file.value();
    const fileContent = readFileSync(filePath);
    memoryKey.set(fileContent);
});

/**
 * Save text file content to memory as text (utf-8)
 * @param {string} file - file path
 * @param {string} memoryKey - memory key
 * @example
 * When I save './folder/file.txt' text file content as 'fileContent'
 * When I save '$filePath' text file as 'fileContent'
 */
When('I save {value} text file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePath = await file.value();
    const fileContent = readFileSync(filePath, 'utf-8');
    memoryKey.set(fileContent);
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
When('I save {value} Excel file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePathOrContent = await file.value();
    const fileContent = getFileContent(filePathOrContent);
    const excelContent = xlsx.read(fileContent);
    memoryKey.set(excelContent);
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
When('I save {value} pdf file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePathOrContent = await file.value();
    const fileContent = getFileContent(filePathOrContent);
    const pdfData = await parsePdf(new Uint8Array(fileContent));
    memoryKey.set(pdfData);
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
When('I save {value} Word file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePathOrContent = await file.value();
    const fileContent = getFileContent(filePathOrContent);
    const pdfData = await parseDocx(fileContent);
    memoryKey.set(pdfData);
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
When('I save {value} csv file content as {value}', async function (file: MemoryValue, memoryKey: MemoryValue) {
    const filePathOrContent = await file.value();
    const fileContent = getFileContent(filePathOrContent);
    const excelContent = xlsx.read(fileContent);
    memoryKey.set(xlsx.utils.sheet_to_json(excelContent.Sheets.Sheet1));
});
